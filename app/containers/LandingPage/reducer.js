/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_EMAIL } from './constants';

export const initialState = {
  email: '',
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
    }
  });

export default landingPageReducer;
