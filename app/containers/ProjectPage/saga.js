import { put, takeLatest, select, call, all } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import request from 'utils/request';
import { setLoginData, setToastData } from 'containers/LoginPage/actions';
import {
  GET_ALL_PROJECTS,
  SET_LOCAL_PROJECTS,
  GET_PROJECT_BY_ID,
  SET_LOCAL_ACTIVE_PROJECT,
  CREATE_PROJECT,
  EDIT_PROJECT,
  GET_ALL_TAGS,
} from './constants';
import { makeSelectProjectPage } from './selectors';
import {
  setLocalActiveProject,
  setLocalProjectTags,
  setLocalProjects,
} from './actions';

function* getAllProjects() {}
function* getProjectById() {}
function* createProject({ payload }) {
  const projectPage = yield select(makeSelectProjectPage());
  const { projects } = projectPage;
  yield put(setLocalProjects([...projects, payload]));
}
function* editProject() {}
function* getAllTags() {
  const requestURL =
    'https://p00egotma6.execute-api.ap-southeast-1.amazonaws.com/prod/skills';
  try {
    const response = yield call(request, requestURL, { method: 'GET' }, false);
    yield put(setLocalProjectTags(response));
    localStorage.setItem('skillsList', JSON.stringify(response));
  } catch (error) {
    yield put(setLocalProjectTags([]));
    localStorage.removeItem('skillsList');
  }
}
export default function* profilePageSaga() {
  yield takeLatest(GET_ALL_PROJECTS, getAllProjects);
  yield takeLatest(GET_PROJECT_BY_ID, getProjectById);
  yield takeLatest(CREATE_PROJECT, createProject);
  yield takeLatest(EDIT_PROJECT, editProject);
  yield takeLatest(GET_ALL_TAGS, getAllTags);
}
