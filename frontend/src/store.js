import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers/index"
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk];
const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(...middleware)))

export default store;