import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import {
  SET_ID,
  SET_BANK_IMAGES,
  SET_LOADING_STATE,
  SET_LOCAL_BANK_DETAILS,
  SET_LOCAL_ADDRESS,
  SET_LOCAL_PAN,
  SET_ADDRESS_IMAGES,
  SET_PAN_IMAGE,
  SET_SIGNATURE_IMAGE,
  SET_LOCAL_SIGNATURE,
} from './constants';

const emptyState = {
  loading: true,
  id: '',
  address: {},
  bankDetailss: [],
  bankImages: {
    id: '',
    images: [],
  },
  addressImages: {
    id: '',
    images: [],
  },
  panDetails: {
    pancard: '',
    files: [],
  },
  panImage: {
    images: [],
  },
  signature: {
    files: [],
  },
  signatureImage: {
    images: [],
  },
};
export const initialState = emptyState;
/* eslint-disable default-case, no-param-reassign */
const kycPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ID:
        draft.id = action.payload;
        break;
      case SET_BANK_IMAGES:
        draft.bankImages = action.payload;
        break;
      case SET_ADDRESS_IMAGES:
        draft.addressImages = action.payload;
        break;
      case SET_PAN_IMAGE:
        draft.panImage = action.payload;
        break;
      case SET_SIGNATURE_IMAGE:
        draft.signatureImage = action.payload;
        break;
      case SET_LOCAL_BANK_DETAILS:
        draft.bankDetailss = action.payload;
        break;
      case SET_LOCAL_ADDRESS:
        draft.address = action.payload;
        break;
      case SET_LOCAL_PAN:
        draft.panDetails = action.payload;
        break;
      case SET_LOCAL_SIGNATURE:
        draft.signature = action.payload;
        break;
      case SET_LOADING_STATE:
        draft.loading = action.payload;
    }
  });

export default kycPageReducer;
