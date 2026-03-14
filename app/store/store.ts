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
import rootEpic from "./epics";

// Tránh lỗi SSR: Next.js render ở server không có localStorage
// createNoopStorage: giả lập storage rỗng khi chạy ở server
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

const cartPersistConfig = {
  key: "cart",
  storage: storageEngine,
  whitelist: ["items"],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const profilePersistConfig = {
  key: "profile",
  storage: storageEngine,
  whitelist: ["data"],
};

const persistedProfileReducer = persistReducer(
  profilePersistConfig,
  profileReducer,
);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, void>();

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    profile: persistedProfileReducer,
    shop: shopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
