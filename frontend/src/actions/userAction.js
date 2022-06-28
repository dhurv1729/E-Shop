import { useDispatch } from "react-redux"
import axios from "axios";

const login = (email, password) => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'USER_LOGIN_REQUEST'
      })
    
      const config = {
        headers: { 
          "content-type": 'application/json'
        }
    }

    const { data } = await axios.post('/api/users/login', {email, password}, config);

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data));

  } 
  catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response && error.response.data.message
    })
  }
}

const register = (name, email, password) => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'USER_REGISTER_REQUEST'
      })
    
      const config = {
        headers: { 
          "content-type": 'application/json'
        }
    }

    const { data } = await axios.post('/api/users/register', {name, email, password}, config);

    dispatch({
      type: 'USER_REGISTER_SUCCESS',
      payload: data
    })

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data));

  } 
  catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload: error.response && error.response.data.message
    })
  }
}

const logout = () => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'USER_LOGOUT'
      })

    localStorage.setItem('userInfo', JSON.stringify(null));

  } 
  catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response && error.response.data.message
    })
  }
}

const getUserDetails = (id) => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'USER_DETAILS_REQUEST'
      })
    
      const { userLogin : { userInfo }} = getState()

      const config = {
        headers: { 
          "content-type": 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: 'USER_DETAILS_SUCCESS',
      payload: data
    })

  } 
  catch (error) {
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload: error.response && error.response.data.message
    })
  }
}

const updateUserDetails = (user) => async(dispatch, getState) => {

  try {
    dispatch({
        type: 'USER_UPDATE_PROFILE_REQUEST'
      })
    
      const { userLogin : { userInfo }} = getState()

      const config = {
        headers: { 
          "content-type": 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: 'USER_UPDATE_PROFILE_SUCCESS',
      payload: data
    })

  } 
  catch (error) {
    dispatch({
      type: 'USER_UPDATE_PROFILE_FAIL',
      payload: error.response && error.response.data.message
    })
  }
}

export { login, logout, register, getUserDetails, updateUserDetails }