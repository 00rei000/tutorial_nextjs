import type { Epic } from "redux-observable";
import { ofType } from "redux-observable";
import { debounceTime, map, mergeMap, catchError, delay } from "rxjs/operators";
import { of } from "rxjs";
import type { Observable } from "rxjs";
import type { AnyAction } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  setSearchInput,
  setSearch,
} from "../slices/shopSlice";
import { products } from "../../data/products";

export const fetchProductsEpic: Epic<AnyAction, AnyAction> = (
  action$: Observable<AnyAction>,
) =>
  action$.pipe(
    ofType(fetchProducts.type),
    mergeMap(() =>
      of(products).pipe(
        delay(1000),
        map((data) => fetchProductsSuccess(data)),
        catchError(() => of(fetchProductsError("Không tải được sản phẩm"))),
      ),
    ),
  );

export const searchDebounceEpic: Epic<AnyAction, AnyAction> = (
  action$: Observable<AnyAction>,
) =>
  action$.pipe(
    ofType(setSearchInput.type),
    debounceTime(1000),
    map((action: AnyAction) => setSearch(action.payload as string)),
  );
