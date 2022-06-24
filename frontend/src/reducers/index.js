import { combineReducers } from "redux";
import {productListReducer, productDetailReducer} from "./productReducer";

const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
})

export default reducers;