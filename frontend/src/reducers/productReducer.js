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

export const productDetailReducer = (state = { products: { reviews: [] }}, action) => {
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
