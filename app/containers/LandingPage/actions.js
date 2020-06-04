/*
 *
 * LandingPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_EMAIL,
  SEND_EMAIL,
  SEND_EMAIL_STATUS,
  SET_NAME,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setEmail(payload) {
  return {
    type: SET_EMAIL,
    payload,
  };
}

export function setName(payload) {
  return {
    type: SET_NAME,
    payload,
  };
}

export function sendEmail() {
  return {
    type: SEND_EMAIL,
  };
}

export function sendEmailStatus(payload) {
  return {
    type: SEND_EMAIL_STATUS,
    payload,
  };
}
