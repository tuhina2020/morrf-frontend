/*
 *
 * LandingPage actions
 *
 */

import { DEFAULT_ACTION, SET_EMAIL } from './constants';

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
