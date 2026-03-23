import { ajax } from "rxjs/ajax";
import { catchError, retry, timeout } from "rxjs/operators";
import { of, type Observable } from "rxjs";

export interface ProductsResponse {
  items: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    description: string;
  }>;
  total: number;
  page: number;
  page_size: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const REQUEST_TIMEOUT_MS = 3000;
const RETRY_COUNT = 3;

const buildUrl = (endpoint: string, params?: URLSearchParams) => {
  const query = params ? `?${params.toString()}` : "";
  return `${API_BASE_URL}${endpoint}${query}`;
};

export function getProducts$(
  params: URLSearchParams,
): Observable<ProductsResponse | { error: true; message: string }> {
  const url = buildUrl("/products", params);
  return ajax.getJSON<ProductsResponse>(url).pipe(
    timeout(REQUEST_TIMEOUT_MS),
    retry(RETRY_COUNT),
    catchError((err) => {
      const message = err?.message || "Unknown error";
      const errorResult: { error: true; message: string } = {
        error: true,
        message,
      };
      return of(errorResult);
    }),
  );
}

export function getProductById$(
  id: number,
): Observable<ProductResponse | {   error: true; message: string }> {
  const url = buildUrl(`/products/${id}`);
  return ajax.getJSON<ProductResponse>(url).pipe(
    timeout(REQUEST_TIMEOUT_MS),
    retry(RETRY_COUNT),
    catchError((err) => {
      const message = err?.message || "Unknown error";
      const errorResult: { error: true; message: string } = {
        error: true,
        message,
      };
      return of(errorResult);
    }),
  );
}
