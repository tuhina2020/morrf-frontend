import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import {
  SET_ID,
  SET_BANK_IMAGES,
  SET_LOADING_STATE,
  SET_LOCAL_BANK_DETAILS,
  SET_LOCAL_ADDRESS,
} from './constants';

const emptyState = {
  loading: true,
  id: '',
  address: {
    line_1: '',
    line_2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    id: '',
    proof_type: '',
  },
  bankDetailss: [],
  bankImages: {
    id: '',
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
      case SET_LOCAL_BANK_DETAILS:
        draft.bankDetailss = action.payload;
        break;
      case SET_LOCAL_ADDRESS:
        draft.address = action.payload;
        break;
      case SET_LOADING_STATE:
        draft.loading = action.payload;
    }
  });

export default kycPageReducer;

