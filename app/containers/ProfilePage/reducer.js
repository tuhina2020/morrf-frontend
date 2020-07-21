/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import { getDefaultState } from 'utils/helper';
import {
  SET_PERSONAL_DATA,
  SET_EMAIL,
  SET_PHONE,
  SET_PORTFOLIO,
  SET_EXPERIENCE,
  SET_SKILLS,
  SET_AVAILABLE_SKILLS,
  SET_ABOUT_ME,
} from './constants';

export const initialState = {
  personal: {
    id: '112233',
    firstName: 'Prasanth',
    lastName: 'Sarvepalli',
    profession: 'Architect',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '',
  },
  about:
    'I am an architect with xyz years of experience. I love working on ideas and implementing from end to end.',
  skills: [
    {
      id: '123',
      name: 'furniture design',
    },
    {
      id: '245',
      name: 'UI/UX',
    },
    {
      id: '546',
      name: 'Architecture',
    },
  ],
  experience: [
    {
      designation: 'Senior Architect',
      company: 'Arup',
      from: '08/2017',
      to: 'present', //have to figure out a way if it is the present workplace
      description: 'Designed and coordinated on site.\nManaged teams',
      order: 1,
    },
    {
      designation: 'Architect',
      company: 'Arup',
      description: 'Designed and coordinated on site.',
      from: '07/2015',
      to: '07/2017',
      order: 2,
    },
  ],
  email: {
    id: 'xyz@xyz.com',
    verified: true,
  },
  phone: {
    number: '8019280192',
    verified: false,
  },
  portfolio: [
    {
      project: 'Aviation Academy at Mumbai',
      year: '2015',
      description: 'New house at Panvel',
      order: 1,
      images: [
        {
          id: '1', // optional (Will depend on the edit portfolio design)
          link: 'https://cdn.img.com',
          description: 'The ceiling',
          order: 1,
        },
        {
          id: 'abc', // optional (Will depend on the edit portfolio design)
          link: 'https://cdn.img1.com',
          description: 'The window',
          order: 2,
        },
      ],
    },
    {
      project: 'Heavy Security Bank, Singapore',
      year: '2017',
      description: 'New house at Koramangala',
      order: 2,
      images: [
        {
          id: '23423', // optional (Will depend on the edit portfolio design)
          link: 'https://cdn.img2.com',
          description: 'The view from outside',
          order: 1,
        },
        {
          id: 'sdfsdff', // optional (Will depend on the edit portfolio design)
          link: 'https://cdn.img3.com',
          description: 'The window',
          order: 2,
        },
      ],
    },
  ],
  getSkills: [
    {
      id: '123',
      name: 'furniture design',
    },
    {
      id: '245',
      name: 'UI/UX',
    },
    {
      id: '546',
      name: 'Architecture',
    },
    {
      id: '123',
      name: 'furniture design',
    },
    {
      id: '245',
      name: 'UI/UX',
    },
    {
      id: '546',
      name: 'Architecture',
    },
  ],
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PERSONAL_DATA:
        draft.personal = action.payload;
        break;
      case SET_ABOUT_ME:
        draft.about = action.payload;
        break;
      case SET_EMAIL:
        draft.email = action.payload;
        break;
      case SET_PHONE:
        draft.phone = action.payload;
        break;
      case SET_PORTFOLIO:
        draft.portfolio = action.payload;
        break;
      case SET_EXPERIENCE:
        draft.experience = action.payload;
        break;
      case SET_AVAILABLE_SKILLS:
        draft.getDefaultState = action.payload;
    }
  });

export default profilePageReducer;
