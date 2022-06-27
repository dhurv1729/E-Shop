import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers/index"
import { composeWithDevTools } from 'redux-devtools-extension'

// const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const intialState = {
  cart: {cartItems: cartItemsFromStorage},
}

const middleware = [thunk];
const store = createStore(reducers, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;