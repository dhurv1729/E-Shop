import { useDispatch } from "react-redux"
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {

    dispatch({ type: 'PRODUCT_LIST_REQUEST' })
    const { data } = await axios.get('/api/products')

    dispatch({
      type: 'PRODUCT_LIST_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload: error.response && error.response.data.message
    })
  }
}

export const listProduct = (id) => async (dispatch) => {
  try {

    dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: 'PRODUCT_DETAIL_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAIL_FAIL',
      payload: error.response && error.response.data.message
    })
  }
  
}
