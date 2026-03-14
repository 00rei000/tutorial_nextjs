import { combineEpics } from "redux-observable";
import { fetchProductsEpic, searchDebounceEpic } from "./shopEpic";

const rootEpic = combineEpics(fetchProductsEpic, searchDebounceEpic);

export default rootEpic;
