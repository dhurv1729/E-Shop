import { combineReducers } from "redux";
import { productListReducer, productDetailReducer, productDeleteReducer } from "./productReducer";
import { cartReducer } from "./cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./userReducers";
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  orderMyListReducer,
} from "./orderReducers";

const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
});

export default reducers;
