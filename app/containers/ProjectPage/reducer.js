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
  SET_LOCAL_PROJECTS,
  SET_LOCAL_ACTIVE_PROJECT,
  SET_LOCAL_TAGS,
} from './constants';

export const initialState = {
  projects: [
    {
      name: 'Project Name 1',
      status: 'New',
      budget: 10000,
      team: [],
      tags: [
        {
          id: '1',
          value: 'interiors',
        },
        {
          id: '2',
          value: 'graphics',
        },
        {
          id: '3',
          value: 'motion',
        },
      ],
      createdOn: '04-18-2020',
      completion: 0.7,
    },
    {
      name: 'Project Name 2',
      status: 'New',
      budget: 10000,
      team: [],
      tags: [
        {
          id: '1',
          value: 'interiors',
        },
        {
          id: '2',
          value: 'graphics',
        },
        {
          id: '3',
          value: 'motion',
        },
      ],
      createdOn: '04-18-2020',
      completion: 0.3,
    },
    {
      name: 'Project Name 2',
      status: 'New',
      budget: 10000,
      team: [],
      tags: [
        {
          id: '1',
          value: 'interiors',
        },
        {
          id: '2',
          value: 'graphics',
        },
        {
          id: '3',
          value: 'motion',
        },
      ],
      createdOn: '04-18-2020',
      completion: 0.5,
    },
  ],
  activeProject: {},
  skillsList: [],
};

/* eslint-disable default-case, no-param-reassign */
const projectPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOCAL_PROJECTS:
        draft.projects = action.payload;
        break;
      case SET_LOCAL_ACTIVE_PROJECT:
        draft.activeProject = action.payload;
        break;
      case SET_LOCAL_TAGS:
        draft.skillsList = action.payload;
        break;
    }
  });

export default projectPageReducer;
