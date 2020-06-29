/*
 *
 * LandingPage actions
 *
 */

import {
  GET_EXISTING_USER,
  SIGN_IN_EXISTING,
  SET_USER,
  SET_LOGIN_DATA,
} from './constants';

export function getExistingUser(payload) {
  return {
    type: GET_EXISTING_USER,
    payload,
  };
}

export function signInExisting(payload) {
  return {
    type: SIGN_IN_EXISTING,
    payload,
  };
}

export function setExistingUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}

export function setLoginData(payload) {
  return {
    type: SET_LOGIN_DATA,
    payload,
  };
}
