/*
 *
 * LandingPage actions
 *
 */

import {
  GET_EXISTING_USER,
  SIGNIN_ALL_USERS,
  SET_LOGIN_DATA,
  VERIFY_PASSWORD,
  FORGOT_PASSWORD,
  SET_CHOICE,
  SET_TOAST_MESSAGE,
  RESEND_CODE,
  SET_GLOBAL_CHOICE,
  LOGIN_GOOGLE,
  GET_USER_BY_ID,
} from './constants';

export function getUserById(payload) {
  return {
    type: GET_USER_BY_ID,
    payload,
  };
}

export function getExistingUser(payload) {
  return {
    type: GET_EXISTING_USER,
    payload,
  };
}

export function signInAllUsers(payload) {
  return {
    type: SIGNIN_ALL_USERS,
    payload,
  };
}

export function setLoginData(payload) {
  return {
    type: SET_LOGIN_DATA,
    payload,
  };
}

export function verifyNewPassword(payload) {
  return {
    type: VERIFY_PASSWORD,
    payload,
  };
}

export function setChoice(payload) {
  console.log('SETTING CHOICE ', payload);
  return {
    type: SET_CHOICE,
    payload,
  };
}

export function setToastData(payload) {
  return {
    type: SET_TOAST_MESSAGE,
    payload,
  };
}

export function forgotPassword(payload) {
  return {
    type: FORGOT_PASSWORD,
    payload,
  };
}

export function resendCode(payload) {
  return {
    type: RESEND_CODE,
    payload,
  };
}

export function setGlobalChoice(payload) {
  return {
    type: SET_GLOBAL_CHOICE,
    payload,
  };
}

export function googleLogin(payload) {
  return {
    type: LOGIN_GOOGLE,
    payload,
  };
}
