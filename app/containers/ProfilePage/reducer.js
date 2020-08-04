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

const emptyState = {
  email: {
    id: 'xyz@xyz.com',
    verified: true,
  },
  phone: {},
  personal: {},
  about: '',
  skills: [],
  portfolio: [],
  experience: [],
};

const currentSkillsObj1 = [
  {
    id: '123-a',
    name: 'furniture design',
    category: 'newcategory-1',
    groupLabel: 'Architecture',
  },
  {
    id: '546-es',
    name: 'Architecture',
    category: 'newcategory-1',
    groupLabel: 'Architecture',
  },
  {
    id: '123-b',
    name: 'interior design',
    category: 'newcategory-1',
    groupLabel: 'Architecture',
  },
  {
    id: '245',
    name: 'UI/UX',
    category: 'newcategory-2',
    groupLabel: 'Design Skills',
  },
  {
    id: '245-bx',
    name: 'Illustrator',
    category: 'newcategory-3',
    groupLabel: 'Software Skills',
  },
  {
    id: '546',
    name: 'Photoshop',
    category: 'newcategory-3',
    groupLabel: 'Software Skills',
  },
];

const allSkillsObj1 = [
  {
    id: '1234',
    name: 'furnace design',
    category: 'newcategory-1',
    groupLabel: 'Architecture',
  },
  {
    id: '2451',
    name: 'Illustration Tools',
    category: 'newcategory-1',
    groupLabel: 'Architecture',
  },
  {
    id: '123-a',
    name: 'furniture design',
    category: 'newcategory-1',
    groupLabel: 'Architecture',
  },
  {
    id: '245',
    name: 'UI/UX',
    category: 'newcategory-1',
    groupLabel: 'Architecture',
  },
  {
    id: '546-es',
    name: 'Architecture',
    category: 'newcategory-1',
    groupLabel: 'Architecture',
  },
  {
    id: '2452',
    name: 'UI/UX Research',
    category: 'newcategory-2',
    groupLabel: 'Design Skills',
  },
  {
    id: '2452-xd',
    name: 'Geo mapping',
    category: 'newcategory-2',
    groupLabel: 'Design Skills',
  },
  {
    id: '2452-ab',
    name: 'Metallurgy',
    category: 'newcategory-2',
    groupLabel: 'Design Skills',
  },
  {
    id: '5469-b',
    name: 'Town planning',
    category: 'newcategory-2',
    groupLabel: 'Design Skills',
  },
  {
    id: '123-b',
    name: 'interior design',
    category: 'newcategory-2',
    groupLabel: 'Design Skills',
  },
  {
    id: '245-bx',
    name: 'Illustrator',
    category: 'newcategory-3',
    groupLabel: 'Software Skills',
  },
  {
    id: '546',
    name: 'Photoshop',
    category: 'newcategory-3',
    groupLabel: 'Software Skills',
  },
  {
    id: '5469-a',
    name: '3ds Max',
    category: 'newcategory-3',
    groupLabel: 'Software Skills',
  },
];

const dummyFilled = {
  personal: {
    id: '112233',
    firstName: 'Prasanth',
    lastName: 'Sarvepalli',
    profession: 'Architect',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '',
  },
  email: {
    id: 'xyz@xyz.com',
    verified: true,
  },
  about:
    'I am an architect with xyz years of experience. I love working on ideas and implementing from end to end.',
  skills: currentSkillsObj1,
  experience: [
    {
      designation: 'Senior Architect',
      company: 'Arup',
      from: '08/2017',
      to: '', // have to figure out a way if it is the present workplace
      description: 'Designed and coordinated on site.\nManaged teams',
      order: 1,
      present: true,
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
  phone: {
    number: '8019280192',
    verified: false,
  },
  portfolio: [
    {
      project: 'Aviation Academy at Mumbai',
      client: 'Novo Matrix',
      completion: '07/2018',
      description: 'New house at Panvel 1',
      order: 1,
      images: [
        {
          id: '1', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          description: 'The ceiling',
          name: 'ScreenShot-11',
          order: 1,
        },
        {
          id: 'abc', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          name: 'ScreenShot-12',
          description: 'The window',
          order: 2,
        },
      ],
    },
    {
      project: 'Heavy Security Bank, Singapore',
      client: 'Novo Matrix',
      completion: '03/2017',
      description: 'New house at Koramangala 2',
      order: 2,
      images: [
        {
          id: '23423', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          description: 'The view from outside',
          name: 'ScreenShot-9',
          order: 1,
        },
        {
          id: 'sdfsdff', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          name: 'ScreenShot-10',
          description: 'The window',
          order: 2,
        },
      ],
    },
    {
      project: 'Aviation Academy at Mumbai 2',
      client: 'Novo Matrix',
      completion: '07/2018',
      description: 'New house at Panvel 3',
      order: 3,
      images: [
        {
          id: '1', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          description: 'The ceiling',
          name: 'ScreenShot-7',
          order: 1,
        },
        {
          id: 'abc', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          description: 'The window',
          name: 'ScreenShot-8',
          order: 2,
        },
      ],
    },
    {
      project: 'Heavy Security Bank, Singapore 2',
      client: 'Novo Matrix',
      completion: '03/2017',
      description: 'New house at Koramangala 4',
      order: 4,
      images: [
        {
          id: '23423', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          description: 'The view from outside',
          name: 'ScreenShot-1',
          order: 1,
        },
        {
          id: 'sdfsdff', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          description: 'The window',
          name: 'ScreenShot-2',
          order: 2,
        },
      ],
    },
    {
      project: 'Aviation Academy at Mumbai 3',
      client: 'Novo Matrix',
      completion: '07/2018',
      description: 'New house at Panvel 5',
      order: 5,
      images: [
        {
          id: '1', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          name: 'ScreenShot-3',
          description: 'The ceiling',
          order: 1,
        },
        {
          id: 'abc', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          description: 'The window',
          order: 2,
        },
      ],
    },
    {
      project: 'Heavy Security Bank, Singapore 3',
      client: 'Novo Matrix',
      completion: '03/2017',
      description: 'New house at Koramangala 6',
      order: 6,
      images: [
        {
          id: '23423', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          name: 'ScreenShot-5',
          description: 'The view from outside',
          order: 1,
        },
        {
          id: 'sdfsdff', // optional (Will depend on the edit portfolio design)
          link: 'http:lorempixel.com/g/400/200/',
          name: 'ScreenShot-6',
          description: 'The window',
          order: 2,
        },
      ],
    },
  ],
  getAllSkills: allSkillsObj1,
};

export const initialState = dummyFilled;

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
