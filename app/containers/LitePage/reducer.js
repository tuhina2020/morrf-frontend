/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import { SET_TOAST_MESSAGE, SET_LOCAL_SKILLS } from './constants';
import { getDefaultState } from 'utils/helper';
export const initialState = {
  error: {},
  skillsList: getDefaultState('skillsList', []),
  success: true,
};

/* eslint-disable default-case, no-param-reassign */
const litePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TOAST_MESSAGE:
        draft.error = action.payload;
        break;
      case SET_LOCAL_SKILLS:
        draft.skillsList = action.payload;
        break;
    }
  });

export default litePageReducer;
