import { useDispatch } from "react-redux";
import axios from "axios";

const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: message,
    });
  }
};

const register = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password },
      config
    );

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: message,
    });
  }
};

const logout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_LOGOUT" });
    dispatch({ type: "USER_DETAILS_RESET" });
    dispatch({ type: "ORDER_LIST_MY_RESET" });
    dispatch({ type: "USER_LIST_RESET" });

    localStorage.setItem("userInfo", JSON.stringify(null));
  } catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: message,
    });
  }
};

const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload: message
    });
  }
};

const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_PROFILE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: data,
    });
  } catch (error) {

    const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message

    dispatch({
      type: "USER_UPDATE_PROFILE_FAIL",
      payload: message
    });
  }
};

const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_LIST_REQUEST",
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

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: "USER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {

    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

    dispatch({
      type: "USER_LIST_FAIL",
      payload: message
        
    });
  }
};

const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DELETE_REQUEST",
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
    const { data } = await axios.delete(`/api/users/delete/${id}`, config);

    dispatch({
      type: "USER_DELETE_SUCCESS",
      payload: data,
    });
  } catch (error) {

    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

    console.log(message);
    dispatch({
      type: "USER_DELETE_FAIL",
      payload: message
        
    });
  }
};

const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_REQUEST",
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
    const { data } = await axios.put(`/api/users/update/${user._id}`, user, config);

    dispatch({
      type: "USER_UPDATE_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data
    })

  } catch (error) {

    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

    console.log(message);
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload: message
        
    });
  }
};


export {
  login,
  logout,
  register,
  getUserDetails,
  updateUserDetails,
  getUserList,
  deleteUser,
  updateUser
};
