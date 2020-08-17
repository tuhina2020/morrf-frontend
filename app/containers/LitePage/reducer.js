/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import { SET_TOAST_MESSAGE } from './constants';

export const initialState = {
  error: {},
  success: true,
};

/* eslint-disable default-case, no-param-reassign */
const litePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TOAST_MESSAGE:
        draft.error = action.payload;
        break;
    }
  });

export default litePageReducer;
