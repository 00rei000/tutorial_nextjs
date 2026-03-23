import type { Epic } from "redux-observable";
import { ofType } from "redux-observable";
import {
  debounceTime,
  map,
  catchError,
  withLatestFrom,
  switchMap,
  shareReplay,
  timeout,
  retry,
} from "rxjs/operators";
import { of } from "rxjs";
import type { Observable } from "rxjs";
import type { AnyAction } from "@reduxjs/toolkit";
import type { ProductsResponse } from "../../services/rxApiClient";
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  setSearchInput,
  setSearch,
} from "../slices/shopSlice";
import { RootState } from "../store";
import { getProducts$ } from "../../services/rxApiClient";

type ProductsResult = ProductsResponse | { error: true; message: string };

/**
 * Fetch Products Epic
 *
 * Lắng nghe fetchProducts action, lấy search/filter/paging từ state,
 * gọi API backend, và dispatch fetchProductsSuccess/fetchProductsError
 
 * Luồng:
 * 1. User action -> fetchProducts
 * 2. Epic lấy params từ state
 * 3. Gọi rxApiClient.getProducts$(params)
 * 4. Dispatch fetchProductsSuccess(data) hoặc fetchProductsError(error)
 */
export const fetchProductsEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType(fetchProducts.type),
    withLatestFrom(state$),
    // Không lọc bằng distinctUntilChanged để đảm bảo mỗi lần fetchProducts đều gọi API
    switchMap(([action, state]) => {
      void action;
      const { search, filter, currentPage, pageSize } = state.shop;

      // Build query params
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (filter.priceFrom !== undefined)
        params.append("min_price", filter.priceFrom.toString());
      if (filter.priceTo !== undefined)
        params.append("max_price", filter.priceTo.toString());
      if (filter.ratingFrom !== undefined)
        params.append("rating", filter.ratingFrom.toString());
      params.append("page", currentPage.toString());
      params.append("page_size", pageSize.toString());

      // Call API via rx client with retry/timeout and cache
      return getProducts$(params).pipe(
        timeout(5000),
        retry(3),
        map((data: ProductsResult) => {
          if ("error" in data) {
            return fetchProductsError(
              data.message ?? "Không tải được sản phẩm",
            );
          }
          return fetchProductsSuccess(data);
        }),
        catchError(() => of(fetchProductsError("Không tải được sản phẩm"))),
        shareReplay(1),
      );
    }),
  );

/**
 * Search Debounce Epic
 */
export const searchDebounceEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$: Observable<AnyAction>,
) =>
  action$.pipe(
    ofType(setSearchInput.type),
    debounceTime(300),
    map((action: AnyAction) => setSearch(action.payload as string)),
  );
