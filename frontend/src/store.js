import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers/index"
import { composeWithDevTools } from 'redux-devtools-extension'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
  cart: {cartItems: cartItemsFromStorage},
  userLogin: {userInfo: userInfoFromStorage }
}

const middleware = [thunk];
const store = createStore(reducers, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;