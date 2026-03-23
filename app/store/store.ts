import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import type { AnyAction } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./slices/cartSlice";
import profileReducer from "./slices/profileSlice";
import shopReducer from "./slices/shopSlice";
import productDetailReducer from "./slices/productDetailSlice";
import rootEpic from "./epics";

/**
 * SSR Support: Kiểm tra nếu chạy trên client (có window)
 * Nếu server (không có window), dùng noop storage để tránh lỗi
 */
function createNoopStorage() {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
}

const storageEngine =
  typeof window !== "undefined" ? storage : createNoopStorage();

/**
 * Cart Persist Config
 * Persist: items (giỏ hàng được lưu khi reload)
 */
const cartPersistConfig = {
  key: "cart",
  storage: storageEngine,
  whitelist: ["items"],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

/**
 * Profile Persist Config
 * Persist: data (thông tin người dùng được lưu)
 */
const profilePersistConfig = {
  key: "profile",
  storage: storageEngine,
  whitelist: ["data"],
};

const persistedProfileReducer = persistReducer(
  profilePersistConfig,
  profileReducer,
);

const rootReducer = {
  cart: persistedCartReducer,
  profile: persistedProfileReducer,
  shop: shopReducer,
  productDetail: productDetailReducer,
};

/**
 * RootState Type - Định nghĩa kiểu của state toàn bộ store
 * Dùng cho Epic middleware và useAppSelector
 */
export type RootState = {
  cart: ReturnType<typeof persistedCartReducer>;
  profile: ReturnType<typeof persistedProfileReducer>;
  shop: ReturnType<typeof shopReducer>;
  productDetail: ReturnType<typeof productDetailReducer>;
};

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(epicMiddleware),
});

// Run root epic
epicMiddleware.run(rootEpic);

// Create persistor for redux-persist integration
export const persistor = persistStore(store);

// Export AppDispatch type
export type AppDispatch = typeof store.dispatch;
