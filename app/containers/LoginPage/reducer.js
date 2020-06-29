/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import { SET_USER, SET_LOGIN_DATA } from './constants';

export const initialState = {
  user: {},
  login: {},
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER:
        draft.user = action.payload;
        break;
      case SET_LOGIN_DATA:
        draft.login = action.payload;
        break;
    }
  });

export default loginPageReducer;
