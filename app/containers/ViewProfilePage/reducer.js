/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import { getDefaultState } from 'utils/helper';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import {
  SET_LOCAL_PERSONAL_DATA,
  SET_EMAIL,
  SET_PHONE,
  SET_LOCAL_PORTFOLIO,
  SET_LOCAL_EXPERIENCE,
  SET_LOCAL_SKILLS,
  SET_LOCAL_ABOUT_ME,
  SET_ID,
  SET_PORTFOLIO_IMAGES,
  SET_LOADING_STATE,
} from './constants';

const emptyState = {
  loading: true,
  email: '',
  phone: {
    number: '',
    verified: false,
  },
  id: '',
  personal: {
    firstName: '',
    lastName: '',
    profession: '',
    city: '',
    state: '',
  },
  about: '',
  portfolio: [],
  skills: [],
  experience: [],
  skillsList: [],
  portfolioImages: {
    id: '',
    images: [],
  },
};

export const initialState = emptyState;

/* eslint-disable default-case, no-param-reassign */
const viewProfilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOCAL_PERSONAL_DATA:
        draft.personal = action.payload;
        break;
      case SET_LOCAL_ABOUT_ME:
        draft.about = action.payload;
        break;
      case SET_EMAIL:
        draft.email = action.payload;
        break;
      case SET_PHONE:
        draft.phone = action.payload;
        break;
      case SET_LOCAL_PORTFOLIO:
        draft.portfolio = action.payload;
        break;
      case SET_LOCAL_EXPERIENCE:
        draft.experience = action.payload;
        break;
      case SET_LOCAL_SKILLS:
        draft.skills = action.payload;
        break;
      case SET_ID:
        draft.id = action.payload;
        break;
      case SET_PORTFOLIO_IMAGES:
        draft.portfolioImages = action.payload;
        break;
      case SET_LOADING_STATE:
        draft.loading = action.payload;
    }
  });

export default viewProfilePageReducer;
