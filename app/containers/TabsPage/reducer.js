/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import { SET_ID } from './constants';

export const initialState = {
  id: '',
};

/* eslint-disable default-case, no-param-reassign */
const TabsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ID:
        draft.id = action.payload;
        break;
    }
  });

export default TabsPageReducer;
