import {
  UPLOAD_BANK_IMAGE,
  UPLOAD_PAN_IMAGE,
  UPLOAD_SIGNATURE_IMAGE,
  UPLOAD_ADDRESS_IMAGE,
  SET_ADDRESS_IMAGES,
  SET_PAN_IMAGE,
  SET_SIGNATURE_IMAGE,
  REMOVE_ADDRESS_IMAGES,
  REMOVE_PAN_IMAGE,
  REMOVE_SIGNATURE_IMAGE,
  GET_USER_PAN,
  REMOVE_PAN,
  SET_REMOTE_PAN,
  SET_LOCAL_PAN,
  EDIT_PAN,
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
  SET_REMOTE_SIGNATURE,
  SET_LOCAL_SIGNATURE,
  EDIT_SIGNATURE,
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
export function setRemotePan(payload) {
  return { type: SET_REMOTE_PAN, payload };
}
export function setLocalPan(payload) {
  return { type: SET_LOCAL_PAN, payload };
}
export function editPanDetails(payload) {
  return { type: EDIT_PAN, payload };
}
export function setRemoteSignature(payload) {
  return { type: SET_REMOTE_SIGNATURE, payload };
}
export function setLocalSignature(payload) {
  return { type: SET_LOCAL_SIGNATURE, payload };
}
export function editSignature(payload) {
  return { type: EDIT_SIGNATURE, payload };
}
export function getUserPan(payload) {
  return { type: GET_USER_PAN, payload };
}
export function uploadBankImage(payload) {
  return { type: UPLOAD_BANK_IMAGE, payload };
}
export function uploadAddressImage(payload) {
  return { type: UPLOAD_ADDRESS_IMAGE, payload };
}
export function uploadPanImage(payload) {
  return { type: UPLOAD_PAN_IMAGE, payload };
}
export function uploadSignatureImage(payload) {
  return { type: UPLOAD_SIGNATURE_IMAGE, payload };
}
export function removeBankDetails(payload) {
  return {
    type: REMOVE_BANK_DETAILS,
    payload,
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
export function setAddressImages(payload) {
  return {
    type: SET_ADDRESS_IMAGES,
    payload,
  };
}
export function removeAddressImages(payload) {
  return {
    type: REMOVE_ADDRESS_IMAGES,
    payload,
  };
}
export function setPanImage(payload) {
  return {
    type: SET_PAN_IMAGE,
    payload,
  };
}
export function removePanImage(payload) {
  return {
    type: REMOVE_PAN_IMAGE,
    payload,
  };
}
export function setSignatureImage(payload) {
  return {
    type: SET_SIGNATURE_IMAGE,
    payload,
  };
}
export function removeSignatureImage(payload) {
  return {
    type: REMOVE_SIGNATURE_IMAGE,
    payload,
  };
}