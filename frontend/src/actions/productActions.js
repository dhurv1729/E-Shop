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

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload: message
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

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: 'PRODUCT_DETAIL_FAIL',
      payload: message
    })
  }
  
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_DELETE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/products/delete/${id}`, config);

    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
      payload: data,
    });
  } catch (error) {

    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

    console.log(message);
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload: message
        
    });
  }
};