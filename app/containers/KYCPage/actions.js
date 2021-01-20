import {
    UPLOAD_BANK_IMAGE,
    LOGOUT,
    SET_ID,
    SET_BANK_IMAGES,
    REMOVE_BANK_IMAGES,
    SET_LOADING_STATE,
    SET_REMOTE_BANK_DETAILS,
    SET_LOCAL_BANK_DETAILS,
    GET_BANK_DETAILS,
    EDIT_BANK_DETAILS,
    REMOVE_BANK_DETAILS,
    SET_LOCAL_ADDRESS,
    SET_REMOTE_ADDRESS,
    GET_ADDRESS,
    EDIT_ADDRESS,
    REMOVE_ADDRESS,
  } from './constants';
  export function setLocalBankDetails(payload) {
    return { type: SET_LOCAL_BANK_DETAILS, payload };
  }
  export function setRemoteBankDetails(payload) {
    return { type: SET_REMOTE_BANK_DETAILS, payload };
  }
  export function getBankDetails(payload) {
    return { type: GET_BANK_DETAILS, payload };
  }
  export function editBankDetails(payload) {
    return { type: EDIT_BANK_DETAILS, payload };
  }
  export function setRemoteAddress(payload) {
    return { type: SET_REMOTE_ADDRESS, payload };
  }
  export function setLocalAddress(payload) {
    return { type: SET_LOCAL_ADDRESS, payload };
  }
  export function getAddress(payload) {
    return { type: GET_ADDRESS, payload };
  }
  export function editAddress(payload) {
    return { type: EDIT_ADDRESS, payload };
  }
  export function removeAddress(payload) {
    return {
      type: REMOVE_ADDRESS,
      payload,
    };
  }
  export function uploadBankImage(payload) {
    return { type: UPLOAD_BANK_IMAGE, payload };
  }
  export function removeBankDetails(payload) {
    return {
      type: REMOVE_BANK_DETAILS,
      payload,
    };
  }
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
  export function setLoading(payload) {
    return {
      type: SET_LOADING_STATE,
      payload,
    };
  }
  export function setBankImages(payload) {
    return {
      type: SET_BANK_IMAGES,
      payload,
    };
  }
  export function removeBankImages(payload) {
    return {
      type: REMOVE_BANK_IMAGES,
      payload,
    };
  }
  