import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_AVAILABLE_SKILLS } from './constants';

function* getSkills() {}

export default function* profilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_AVAILABLE_SKILLS, getSkills);
}
