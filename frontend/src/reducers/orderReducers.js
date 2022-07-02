export const orderCreateReducer = (state = { }, action) => {
  if(action.type == 'CREATE_ORDER_REQUEST') {
    return {loading: true}
  }
  else if(action.type == 'CREATE_ORDER_SUCCESS') {
    return {loading: false, order: action.payload, success: true}
  }
  else if(action.type == 'CREATE_ORDER_FAIL') {
    return {lodaing: false, error: action.payload}
  }
  else return state
} 

export const orderDetailReducer = (state = { orderItems:[], shippingAddress: {}, loading: true }, action) => {
  if(action.type == 'ORDER_DETAIL_REQUEST') {
    return {...state, loading: true}
  }
  else if(action.type == 'ORDER_DETAIL_SUCCESS') {
    return {loading: false, order: action.payload}
  }
  else if(action.type == 'ORDER_DETAIL_FAIL') {
    return {lodaing: false, error: action.payload}
  }
  else return state
} 

export const orderPayReducer = (state = { }, action) => {
  if(action.type == 'ORDER_PAY_REQUEST') {
    return {loading: true}
  }
  else if(action.type == 'ORDER_PAY_SUCCESS') {
    return {loading: false, success: true}
  }
  else if(action.type == 'ORDER_PAY_FAIL') {
    return {lodaing: false, error: action.payload}
  }
  else if(action.type == 'ORDER_PAY_RESET') {
    return {}
  }
  else return state
}

export const orderMyListReducer = (state = { orders: []}, action) => {
  if(action.type == 'ORDER_LIST_MY_REQUEST') {
    return {loading: true}
  }
  else if(action.type == 'ORDER_LIST_MY_SUCCESS') {
    return {loading: false, orders: action.payload}
  }
  else if(action.type == 'ORDER_LIST_MY_FAIL') {
    return {lodaing: false, error: action.payload}
  }
  else if(action.type == 'ORDER_LIST_MY_RESET') {
    return {lodaing: false, orders: []}
  }
  else return state
}