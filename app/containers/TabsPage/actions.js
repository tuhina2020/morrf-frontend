import { LOGOUT, SET_ID } from './constants';
export function logout() {
  return {
    type: LOGOUT,
  };
}
export function setId(payload) {
  return {
    type: SET_ID,
    payload,
  };
}