import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },
    increase(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );
      if (item) item.quantity += 1;
    },
    decrease(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

// Selectors for subtotal, tax, total
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartSubTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
);

export const selectCartTax = createSelector(
  selectCartSubTotal,
  (subTotal) => subTotal * 0.1,
);

export const selectCartTotal = createSelector(
  selectCartSubTotal,
  selectCartTax,
  (subTotal, tax) => subTotal + tax,
);
export const { addToCart, removeFromCart, increase, decrease } =
  cartSlice.actions;
export default cartSlice.reducer;
