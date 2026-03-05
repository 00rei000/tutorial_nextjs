import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../app/store/slices/cartSlice";

export function createMockStore(preloadedState = {}) {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });
}

export const emptyCartStore = createMockStore({
  cart: { items: [] },
});

export const filledCartStore = createMockStore({
  cart: {
    items: [
      {
        product: {
          id: 1,
          name: "Samsung Galaxy A31",
          price: 6940000,
          image: "/phone.png",
          rating: 5,
          description: "Galaxy A31 là mẫu smartphone tầm trung",
        },
        quantity: 2,
      },
    ],
  },
});
