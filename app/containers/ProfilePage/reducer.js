/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  SET_LOCAL_PERSONAL_DATA,
  SET_EMAIL,
  SET_PHONE,
  SET_LOCAL_PORTFOLIO,
  SET_LOCAL_EXPERIENCE,
  SET_LOCAL_SKILLS,
  SET_AVAILABLE_SKILLS,
  SET_LOCAL_ABOUT_ME,
} from './constants';
import { getDefaultState } from 'utils/helper';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
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

const allSkillsObj1 = [
  {
    category: 'category-3',
    id: '332',
    name: 'packaging',
    groupLabel: 'Graphic design',
  },
  {
    category: 'category-1',
    id: '115',
    name: 'Museum designer',
    groupLabel: 'Space design / Architecture',
  },
  {
    category: 'category-1',
    id: '118',
    name: 'Recce engineer',
    groupLabel: 'Space design / Architecture',
  },
  {
    category: 'category-2',
    id: '222',
    name: 'Furniture',
    groupLabel: 'Product design',
  },
  {
    category: 'category-1',
    id: '116',
    name: 'Landscape designer',
    groupLabel: 'Space design / Architecture',
  },
  {
    category: 'category-4',
    id: '442',
    name: 'researcher',
    groupLabel: 'Strategy design',
  },
  {
    category: 'category-1',
    id: '117',
    name: 'Lighting designer',
    groupLabel: 'Space design / Architecture',
  },
  {
    category: 'category-1',
    id: '114',
    name: 'Exhibition designer',
    groupLabel: 'Space design / Architecture',
  },
  {
    category: 'category-3',
    id: '331',
    name: 'Logo',
    groupLabel: 'Graphic design',
  },
  {
    category: 'category-3',
    id: '334',
    name: 'website',
    groupLabel: 'Graphic design',
  },
  {
    category: 'category-1',
    id: '113',
    name: 'Retail designer',
    groupLabel: 'Space design / Architecture',
  },
  {
    category: 'category-4',
    id: '441',
    name: 'presentation',
    groupLabel: 'Strategy design',
  },
  {
    category: 'category-2',
    id: '224',
    name: 'Ceramic',
    groupLabel: 'Product design',
  },
  {
    category: 'category-3',
    id: '337',
    name: 'spatial graphics',
    groupLabel: 'Graphic design',
  },
  {
    category: 'category-3',
    id: '336',
    name: 'book',
    groupLabel: 'Graphic design',
  },
  {
    category: 'category-4',
    id: '443',
    name: 'infographic',
    groupLabel: 'Strategy design',
  },
  {
    category: 'category-2',
    id: '223',
    name: 'Toy',
    groupLabel: 'Product design',
  },
  {
    category: 'category-4',
    id: '444',
    name: 'Marketing',
    groupLabel: 'Strategy design',
  },
  {
    category: 'category-2',
    id: '221',
    name: 'Industrial',
    groupLabel: 'Product design',
  },
  {
    category: 'category-1',
    id: '111',
    name: 'Architect',
    groupLabel: 'Space design / Architecture',
  },
  {
    category: 'category-1',
    id: '112',
    name: 'Residential interior designer',
    groupLabel: 'Space design / Architecture',
  },
  {
    category: 'category-3',
    id: '333',
    name: 'branding',
    groupLabel: 'Graphic design',
  },
  {
    category: 'category-2',
    id: '226',
    name: 'Textile',
    groupLabel: 'Product design',
  },
  {
    category: 'category-2',
    id: '225',
    name: 'Digital product',
    groupLabel: 'Product design',
  },
  {
    category: 'category-3',
    id: '335',
    name: 'brochure',
    groupLabel: 'Graphic design',
  },
];

const loginData = getDefaultState('loginData', {});
const getDataFromLogin = key =>
  isEmpty(get(loginData, key)) ? '' : loginData[key];

const emptyState = {
  email: getDataFromLogin('email'),
  phone: {
    number: getDataFromLogin('phone_number'),
  },
  id: getDataFromLogin('id'),
  personal: {
    // firstName: getDataFromLogin('name').split(' ')[0],
    // lastName: getDataFromLogin('name').split(' ')[1],
  },
  about: getDataFromLogin('about'),
  skills: [],
  portfolio: [],
  experience: [],
  getAllSkills: allSkillsObj1,
};

const dummyFilled = {
  personal: {
    firstName: 'Prasanth',
    lastName: 'Sarvepalli',
    profession: 'Architect',
    city: 'Bengaluru',
    state: 'Karnataka',
  },

  email: 'xyz@xyz.com',
  about:
    'I am an architect with xyz years of experience. I love working on ideas and implementing from end to end.',
  skills: currentSkillsObj1,
  experience: [
    {
      designation: 'Senior Architect',
      company: 'Arup',
      startYear: '08/2017',
      endYear: '', // have to figure out a way if it is the present workplace
      highlights: 'Designed and coordinated on site.\nManaged teams',
      order: 1,
      present: true,
    },
    {
      designation: 'Architect',
      company: 'Arup',
      highlights: 'Designed and coordinated on site.',
      startYear: '07/2015',
      endYear: '07/2017',
      order: 2,
    },
  ],
  phone: {
    number: '8019280192',
    verified: false,
  },
  portfolio: [
    {
      project: 'Aviation Academy at Mumbai',
      client: 'Novo Matrix',
      startYear: '07/2018',
      endYear: '08/2019',
      highlights: 'New house at Panvel 1',
      order: 1,
      mode: 'completed',
      images: [
        {
          id: '1', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          type: 'image',
          name: 'ScreenShot-11',
          order: 1,
        },
        {
          id: 'abc', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-12',
          type: 'image',
          order: 2,
        },
        {
          id: '12', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-11a',
          type: 'image',
          order: 1,
        },
        {
          id: 'abcw', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-12a',
          type: 'image',
          order: 2,
        },
        {
          id: '12b', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-11ab',
          type: 'image',
          order: 1,
        },
        {
          id: 'abcqw', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-12ab',
          type: 'image',
          order: 2,
        },
      ],
    },
    {
      project: 'Heavy Security Bank, Singapore',
      client: 'Novo Matrix',
      from: '03/2017',
      to: '08/2019',
      duration: 36,
      description: 'New house at Koramangala 2',
      order: 2,
      mode: 'completed',
      images: [
        {
          id: '23423', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-9',
          order: 1,
          type: 'image',
        },
        {
          id: 'sdfsdff', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-10',
          order: 2,
          type: 'image',
        },
      ],
    },
    {
      project: 'Aviation Academy at Mumbai 2',
      client: 'Novo Matrix',
      startYear: '07/2018',
      endYear: '08/2019',
      highlights: 'New house at Panvel 3',
      order: 3,
      mode: 'completed',
      images: [
        {
          id: '1', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-7',
          order: 1,
          type: 'image',
        },
        {
          id: 'abc', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-8',
          order: 2,
          type: 'image',
        },
      ],
    },
    {
      project: 'Heavy Security Bank, Singapore 2',
      client: 'Novo Matrix',
      startYear: '03/2017',
      endYear: '08/2019',
      duration: 16,
      mode: 'draft',
      highlights: 'New house at Koramangala 4',
      order: 4,
      images: [
        {
          id: '23423', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-1',
          order: 1,
          type: 'image',
        },
        {
          id: 'sdfsdff', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-2',
          order: 2,
          type: 'image',
        },
      ],
    },
    {
      project: 'Aviation Academy at Mumbai 3',
      client: 'Novo Matrix',
      startYear: '07/2018',
      endYear: '08/2019',
      duration: 31,
      highlights: 'New house at Panvel 5',
      order: 5,
      mode: 'draft',
      images: [
        {
          id: '1', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-3',
          order: 1,
          type: 'image',
        },
        {
          id: 'abc', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          order: 2,
          type: 'image',
        },
      ],
    },
    {
      project: 'Heavy Security Bank, Singapore 3',
      client: 'Novo Matrix',
      startYear: '03/2017',
      endYear: '08/2019',
      highlights: 'New house at Koramangala 6',
      order: 6,
      duration: 21,
      mode: 'draft',
      images: [
        {
          id: '23423', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-5',
          order: 1,
          type: 'image',
        },
        {
          id: 'sdfsdff', // optional (Will depend on the edit portfolio design)
          link: 'https://lorempixel.com/200/200/',
          name: 'ScreenShot-6',
          order: 2,
          type: 'image',
        },
      ],
    },
  ],
  getAllSkills: allSkillsObj1,
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
        draft.getAllSkills = action.payload;
        break;
      case SET_LOCAL_SKILLS:
        draft.skills = action.payload;
        break;
    }
  });

export default profilePageReducer;
