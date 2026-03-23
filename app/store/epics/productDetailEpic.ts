import type { Epic } from "redux-observable";
import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, pluck, retry, switchMap } from "rxjs/operators";
import type { AnyAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ProductResponse } from "../../services/rxApiClient";
import { getProductById$ } from "../../services/rxApiClient";
import {
  fetchProductDetail,
  fetchProductDetailSuccess,
  fetchProductDetailError,
} from "../slices/productDetailSlice";

const productDetailEpic: Epic<AnyAction, AnyAction, RootState> = (action$) =>
  action$.pipe(
    ofType(fetchProductDetail.type),
    pluck("payload"),
    switchMap((id: number) =>
      getProductById$(id).pipe(
        retry(2),
        map((data: ProductResponse | { error: true; message: string }) => {
          if ("error" in data) {
            return fetchProductDetailError(
              data.message ?? "Không thể tải sản phẩm",
            );
          }
          return fetchProductDetailSuccess(data);
        }),
        catchError((err: unknown) =>
          of(
            fetchProductDetailError(
              err instanceof Error ? err.message : "Không thể tải sản phẩm",
            ),
          ),
        ),
      ),
    ),
  );

export default productDetailEpic;
