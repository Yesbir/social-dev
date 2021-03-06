import jwtDecode from "jwt-decode";

import { ERROR, LOGIN, REGISTER, LOGOUT } from "./types";
import devConnector from "../apis/devConnector";
import { setAuthToken } from "../utils/setAuthToken";

export const register = (registerData, history) => async (dispatch) => {
  try {
    const response = await devConnector.post(
      "/api/users/register",
      registerData
    );
    const token = response.data.token;
    const user = getUserInfo(token);
    dispatch({
      type: REGISTER,
      payload: user,
    });
    history.push("/");
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.response.data,
    });
  }
};

export const login = (loginData, history) => async (dispatch) => {
  devConnector
    .post("/api/users/login", loginData)
    .then((res) => {
      const { token } = res.data;
      const user = getUserInfo(token);

      dispatch({
        type: LOGIN,
        payload: user,
      });
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    });
};

export const getCurrentUser = (token) => {
  const user = getUserInfo(token);
  return {
    type: LOGIN,
    payload: user,
  };
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  console.log(localStorage);
  setAuthToken(false);
  return {
    type: LOGOUT,
  };
};

const getUserInfo = (token) => {
  localStorage.setItem("jwtToken", token);
  setAuthToken(token);
  const user = jwtDecode(token);
  return user;
};
