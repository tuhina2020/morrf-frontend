/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_EMAIL,
  SEND_EMAIL_STATUS,
  SET_NAME,
} from './constants';

export const initialState = {
  email: '',
  name: '',
  source: 'COMING_SOON',
  status: false,
};

/* eslint-disable default-case, no-param-reassign */
const landingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_EMAIL:
        draft.email = action.payload;
        break;
      case SET_NAME:
        draft.name = action.payload;
        break;
      case SEND_EMAIL_STATUS:
        draft.status = action.payload;
        break;
    }
  });

export default landingPageReducer;
