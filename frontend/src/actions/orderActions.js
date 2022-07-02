import { useDispatch } from "react-redux"
import axios from "axios";

export const createOrder = (user) => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'CREATE_ORDER_REQUEST'
      })
    
      const { userLogin : { userInfo }} = getState()

      const config = {
        headers: { 
          "content-type": 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.post(`/api/orders`, user, config);

    dispatch({
      type: 'CREATE_ORDER_SUCCESS',
      payload: data
    })

  } 
  catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: 'CREATE_ORDER_FAIL',
      payload: message
    })

  }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'ORDER_DETAIL_REQUEST'
      })
    
      const { userLogin : { userInfo }} = getState()

      const config = {
        headers: { 
          "content-type": 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: 'ORDER_DETAIL_SUCCESS',
      payload: data
    })

  } 
  catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: 'ORDER_DETAIL_FAIL',
      payload: message
    })

  }
}

export const payOrder = (id, paymentResult) => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'ORDER_PAY_REQUEST'
      })
    
      const { userLogin : { userInfo }} = getState()

      const config = {
        headers: { 
          "content-type": 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult,  config);
      
    dispatch({
      type: 'ORDER_PAY_SUCCESS',
      payload: data
    })

  } 
  catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: 'ORDER_PAY_FAIL',
      payload: message
    })

  }
}

export const lsitMyOrders = (id, paymentResult) => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'ORDER_LIST_MY_REQUEST'
      })
    
      const { userLogin : { userInfo }} = getState()

      const config = {
        headers: { 
          "content-type": 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    const { data } = await axios.get(`/api/orders/myorders`, config);
      
    dispatch({
      type: 'ORDER_LIST_MY_SUCCESS',
      payload: data
    })

  } 
  catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: 'ORDER_LIST_MY_FAIL',
      payload: message
    })

  }
}