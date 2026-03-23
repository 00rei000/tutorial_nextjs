import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Product } from "../../types/product";

export interface ProductDetailState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

// Action to trigger fetch via epic
export const fetchProductDetail = createAction<number>(
  "shop/fetchProductDetail",
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    fetchProductDetailSuccess(state, action: PayloadAction<Product>) {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductDetailError(state, action: PayloadAction<string>) {
      state.product = null;
      state.loading = false;
      state.error = action.payload;
    },
    // Optional helper if needed to set loading true when dispatching fetch
    setProductDetailLoading(state) {
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail, (state) => {
      state.loading = true;
      state.error = null;
      state.product = null;
    });
  },
});

export const {
  fetchProductDetailSuccess,
  fetchProductDetailError,
  setProductDetailLoading,
} = productDetailSlice.actions;

export const selectProductDetail = (state: RootState) =>
  state.productDetail.product;
export const selectProductDetailLoading = (state: RootState) =>
  state.productDetail.loading;

export default productDetailSlice.reducer;
