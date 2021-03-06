import { ERROR } from "../actions/types";

export const errors = (state = {}, action) => {
  switch (action.type) {
    case ERROR:
      console.log({ ...action.payload });
      return { ...action.payload.errors };
    default:
      return {};
  }
};
