/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import {
  SET_LOCAL_PERSONAL_DATA,
  SET_EMAIL,
  SET_PHONE,
  SET_LOCAL_PORTFOLIO,
  SET_LOCAL_EXPERIENCE,
  SET_LOCAL_SKILLS,
  SET_AVAILABLE_SKILLS,
  SET_LOCAL_ABOUT_ME,
  SET_ID,
  SET_PORTFOLIO_IMAGES,
  SET_LOADING_STATE,
  SET_BANK_DETAILS,
} from './constants';
const currentSkillsObj1 = [
  {
    category: 'category-2',
    id: '222',
    name: 'Furniture',
    groupLabel: 'Product design',
  },
  {
    category: 'category-3',
    id: '332',
    name: 'packaging',
    groupLabel: 'Graphic design',
  },
];

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
  bankDetails: {
    holderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  },
  /* profileImage: {
    id: '',
  }, */
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
const profilePageReducer = (state = initialState, action) =>
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
      case SET_AVAILABLE_SKILLS:
        draft.skillsList = action.payload;
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
      case SET_BANK_DETAILS:
        draft.bankDetails = action.payload;
        break;
      case SET_LOADING_STATE:
        draft.loading = action.payload;
    }
  });

export default profilePageReducer;
