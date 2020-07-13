/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import { getDefaultState } from 'utils/helper';
import { SET_LOGIN_DATA, SET_CHOICE, SET_TOAST_MESSAGE } from './constants';

export const initialState = {
  login: getDefaultState('loginData', {}),
  role: getDefaultState('role'),
  error: {},
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOGIN_DATA:
        draft.login = action.payload;
        break;
      case SET_CHOICE:
        draft.role = action.payload;
        break;
      case SET_TOAST_MESSAGE:
        draft.error = action.payload;
        break;
    }
  });

export default loginPageReducer;
