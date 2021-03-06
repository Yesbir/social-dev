import { REGISTER, LOGIN, LOGOUT } from "../actions/types";
import _ from "lodash";

const initialState = { isLogedIn: false, user: {} };

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, isLogedIn: true, user: { ...action.payload } };
    case LOGIN:
      return {
        ...state,
        isLogedIn: !_.isEmpty(action.payload),
        user: { ...action.payload },
      };
    case LOGOUT:
      return {
        ...state,
        isLogedIn: false,
        user: {},
      };
    default:
      return state;
  }
};
