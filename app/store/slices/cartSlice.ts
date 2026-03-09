import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

interface CartItem {
  product: Product;
  quantity: number;
}
       
interface CartState {
  items: CartItem[];
}

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

export const { addToCart, removeFromCart, increase, decrease } =
  cartSlice.actions;
export default cartSlice.reducer;
