/**
 *
 * Actions LoginContainer
 *
 */
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCEEDED,
  REQUEST_LOGIN_FAILED
} from "./constants";

export const requestLogin = (username, password) => {
  return {
    type: REQUEST_LOGIN,
    payload: {
      username,
      password
    }
  };
};

export const requestLoginSucceeded = payload => {
  return {
    type: REQUEST_LOGIN_SUCCEEDED,
    payload
  };
};

export const requestLoginFailed = () => {
  return {
    type: REQUEST_LOGIN_FAILED
  };
};
