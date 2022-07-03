export const productListReducer = (state = { products: []}, action) => {
  if(action.type == 'PRODUCT_LIST_REQUEST') {
    return {loading: true, products: []}
  }
  else if(action.type == 'PRODUCT_LIST_SUCCESS') {
    return {loading: false, products: action.payload }
  }
  else if(action.type == 'PRODUCT_LIST_FAIL') {
    return {loading: false, error: action.payload }
  }
  else return state;
}

export const productDetailReducer = (state = { product: { reviews: [] }}, action) => {
  if(action.type == 'PRODUCT_DETAIL_REQUEST') {
    return {...state, loading: true}
  }
  else if(action.type == 'PRODUCT_DETAIL_SUCCESS') {
    return {loading: false, product: action.payload}
  }
  else if(action.type == 'PRODUCT_DETAIL_FAIL') {
    return {loading: false, error: action.payload}
  }
  else return state;

}

export const productDeleteReducer = (state = { products: { reviews: [] }}, action) => {
  if(action.type == 'PRODUCT_DELETE_REQUEST') {
    return {...state, loading: true}
  }
  else if(action.type == 'PRODUCT_DELETE_SUCCESS') {
    return {loading: false, success: true}
  }
  else if(action.type == 'PRODUCT_DELETE_FAIL') {
    return {loading: false, error: action.payload}
  }
  else return state;

}

export const productUpdateReducer = (state = { product: { reviews: [] }}, action) => {
  if(action.type == 'PRODUCT_UPDATE_REQUEST') {
    return {...state, loading: true}
  }
  else if(action.type == 'PRODUCT_UPDATE_SUCCESS') {
    return {loading: false, success: true, product: action.payload}
  }
  else if(action.type == 'PRODUCT_UPDATE_FAIL') {
    return {loading: false, error: action.payload}
  }
  else if(action.type == 'PRODUCT_UPDATE_RESET') {
    return {}
  }
  else return state;

}

export const productCreateReducer = (state = { product: { reviews: [] }}, action) => {
  if(action.type == 'PRODUCT_CREATE_REQUEST') {
    return {...state, loading: true}
  }
  else if(action.type == 'PRODUCT_CREATE_SUCCESS') {
    return {loading: false, success: true, product: action.payload}
  }
  else if(action.type == 'PRODUCT_CREATE_FAIL') {
    return {loading: false, error: action.payload}
  }
  else if(action.type == 'PRODUCT_CREATE_RESET') {
    return {}
  }
  else return state;

}

export const createReviewReducer = (state = { }, action) => {
  if(action.type == 'PRODUCT_CREATE_REVIEW_REQUEST') {
    return {...state, loading: true}
  }
  else if(action.type == 'PRODUCT_CREATE_REVIEW_SUCCESS') {
    return {loading: false, success: true}
  }
  else if(action.type == 'PRODUCT_CREATE_REVIEW_FAIL') {
    return {loading: false, error: action.payload}
  }
  else if(action.type == 'PRODUCT_CREATE_REVIEW_RESET') {
    return {}
  }
  else return state;

}