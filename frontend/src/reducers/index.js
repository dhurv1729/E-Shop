import { combineReducers } from "redux";
import {productListReducer, productDetailReducer} from "./productReducer";
import { cartReducer } from './cartReducers';
const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer
})

export default reducers;