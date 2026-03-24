import { combineEpics } from "redux-observable";
import {
  fetchProductsEpic,
  searchDebounceEpic,
  searchFetchEpic,
  filterFetchEpic,
} from "./shopEpic";
import productDetailEpic from "./productDetailEpic";
import type { RootState } from "../store";
import type { AnyAction } from "@reduxjs/toolkit";

const rootEpic = combineEpics<AnyAction, AnyAction, RootState>(
  fetchProductsEpic,
  searchDebounceEpic,
  searchFetchEpic,
  filterFetchEpic,
  productDetailEpic,
);

export default rootEpic;
