import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import type { RootState } from "../store";

export interface FilterValues {
  priceFrom: number;
  priceTo: number;
  ratingFrom: number;
  ratingTo: number;
}

interface ShopState {
  products: Product[];
  total: number;
  search: string;
  filter: FilterValues;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  /*
  ✅ Redux Observable pattern:
  1. UI dispatch(fetchProducts) 
  2. Epic → rxApiClient.getProducts$()
  3. Backend → dispatch(fetchProductsSuccess)
  */
}

const initialState: ShopState = {
  products: [],
  total: 0,
  search: "",
  filter: {
    priceFrom: 0,
    priceTo: 10000000,
    ratingFrom: 0,
    ratingTo: 5,
  },
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (
      state,
      action: PayloadAction<{
        items: Product[];
        total: number;
        page: number;
        page_size: number;
      }>,
    ) => {
      state.products = action.payload.items;
      state.total = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.page_size;
      state.loading = false;
    },
    fetchProductsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setFilter: (state, action: PayloadAction<FilterValues>) => {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      void state;
      void action;
      // handled by epic (debounce)
    },
  },
});

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  setSearch,
  setFilter,
  setPage,
  setSearchInput,
} = shopSlice.actions;

export const selectShopState = (state: RootState) => state.shop;

export const selectFilteredProducts = createSelector(
  [selectShopState],
  (shop) => shop.products,
);

export const selectShopTotal = createSelector(
  [selectShopState],
  (shop) => shop.total,
);
export const selectShopPageSize = createSelector(
  [selectShopState],
  (shop) => shop.pageSize,
);

export default shopSlice.reducer;
