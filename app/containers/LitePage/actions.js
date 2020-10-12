import {
  EMAIL_REQUEST,
  CALLBACK_REQUEST,
  SET_TOAST_MESSAGE,
  SET_SUCCESS,
  GET_ALL_SKILLS,
  SET_LOCAL_SKILLS,
} from './constants';
export function emailRequest(payload) {
  return { type: EMAIL_REQUEST, payload };
}

export function callbackRequest(payload) {
  return { type: CALLBACK_REQUEST, payload };
}

export function setToastData(payload) {
  return {
    type: SET_TOAST_MESSAGE,
    payload,
  };
}
export function setSuccess(payload) {
  return {
    type: SET_SUCCESS,
    payload,
  };
}

export function getAllSkills() {
  return {
    type: GET_ALL_SKILLS,
  };
}

export function setLocalSkills(payload) {
  return {
    type: SET_LOCAL_SKILLS,
    payload,
  };
}
