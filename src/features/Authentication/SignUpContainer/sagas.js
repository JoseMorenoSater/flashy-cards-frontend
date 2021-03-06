/**
 *
 * SignUpContainer Sagas
 *
 */

import { Auth } from "../../../agent";
import { takeEvery, call, put } from "redux-saga/effects";
import { REQUEST_SIGNUP } from "./constants";
import {
  requestSignUpSucceeded,
  requestSignUpFailed,
  differentPasswordError
} from "./actions";
import { emptyPasswordError, emptyUsernameError } from "../actions";

const postNewUserData = userData => {
  return Auth.signUp(userData)
    .then(response => {
      Auth.configCookies(response.data.credentials);
      Auth.configHeaders();
      return response.data;
    })
    .catch(error => {
      console.log("error at register user");
      return false;
    });
};

function* validateForm({ confirmPassword, password, username }) {
  yield console.log({ confirmPassword, password, username });
  if (password !== confirmPassword) {
    yield put(differentPasswordError());
    return false;
  }
  if (username === "") {
    yield put(emptyUsernameError());
    return false;
  }
  if (password === "") {
    yield put(emptyPasswordError());
    return false;
  }
  return true;
}

function* requestSignUp(action) {
  const validForm = yield call(validateForm, action.payload);
  if (validForm) {
    const response = yield call(postNewUserData, action.payload);
    if (response) {
      yield put(requestSignUpSucceeded(response));
      Auth.saveUserData(response.user_data);
    } else {
      yield put(requestSignUpFailed());
    }
  }
}

export function* defaultSagas() {
  yield takeEvery(REQUEST_SIGNUP, requestSignUp);
}

export default defaultSagas;
