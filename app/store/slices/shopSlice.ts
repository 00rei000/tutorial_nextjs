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
  search: string;
  filter: FilterValues;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ShopState = {
  products: [],
  search: "",
  filter: {
    priceFrom: 0,
    priceTo: 10000000,
    ratingFrom: 0,
    ratingTo: 5,
  },
  currentPage: 1,
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
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
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
  (shop) => {
    const { products, search, filter } = shop;
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchPrice =
        p.price >= filter.priceFrom && p.price <= filter.priceTo;
      const matchRating =
        p.rating >= filter.ratingFrom && p.rating <= filter.ratingTo;
      return matchSearch && matchPrice && matchRating;
    });
  },
);

export default shopSlice.reducer;
