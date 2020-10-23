import { call, put, select, takeLatest } from 'redux-saga/effects';
import { EMAIL_REQUEST, CALLBACK_REQUEST, GET_ALL_SKILLS } from './constants';
import request from 'utils/request';
import { setToastData, setSuccess, setLocalSkills } from './actions';
import sortBy from 'lodash/sortBy';
export function* emailReq({ payload }) {
  const requestURL =
    'https://p00egotma6.execute-api.ap-southeast-1.amazonaws.com/prod/project-details';
  try {
    const data = { ...payload };
    data.specialist = data.specialist.map(s => s.name).join(',');
    const response = yield call(
      request,
      requestURL,
      {
        data,
      },
      false,
    );
    yield put(setSuccess(true));
    // yield put(
    //   setToastData({
    //     message: response.message,
    //     type: 'info',
    //   }),
    // );
  } catch (err) {
    // yield put(
    //   setToastData({
    //     message: err.message,
    //     type: 'info',
    //   }),
    // );
    yield put(setSuccess(false));
  }
}
export function* callbackReq({ payload }) {
  const requestURL =
    'https://p00egotma6.execute-api.ap-southeast-1.amazonaws.com/prod/call-details';
  try {
    const data = { ...payload };
    const response = yield call(
      request,
      requestURL,
      {
        data,
      },
      false,
    );
    // yield put(
    //   setToastData({
    //     message: response.message,
    //     type: 'info',
    //   }),
    // );
    yield put(setSuccess(true));
  } catch (err) {
    // yield put(
    //   setToastData({
    //     message: 'This part is done',
    //     type: 'info',
    //   }),
    // );
    yield put(setSuccess(false));
  }
}

function* getAllSkills() {
  const requestURL =
    'https://p00egotma6.execute-api.ap-southeast-1.amazonaws.com/prod/skills';
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'GET',
      },
      false,
    );
    const skills = sortBy(response, 'category');
    yield put(setLocalSkills(skills));
    localStorage.setItem('skillsList', JSON.stringify(skills));
  } catch (error) {
    yield put(setLocalSkills([]));
    localStorage.removeItem('skillsList');
  }
}
export default function* litePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(EMAIL_REQUEST, emailReq);
  yield takeLatest(CALLBACK_REQUEST, callbackReq);
  yield takeLatest(GET_ALL_SKILLS, getAllSkills);
}
