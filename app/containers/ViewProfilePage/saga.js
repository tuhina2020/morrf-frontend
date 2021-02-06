import { put, takeLatest, select, call, all } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import compact from 'lodash/compact';
import request from 'utils/request';
import { setLoginData, setToastData } from 'containers/LoginPage/actions';
import {
  SEND_VERIFICATION,
  VERIFY_PHONE,
  SET_REMOTE_EXPERIENCE,
  SET_REMOTE_ABOUT_ME,
  SET_REMOTE_PERSONAL_DATA,
  SET_REMOTE_PORTFOLIO,
  SET_REMOTE_SKILLS,
  SET_REMOTE_PHONE,
  GET_USER,
  UPLOAD_IMAGE,
  GET_ALL_SKILLS,
  REMOVE_PORTFOLIO,
  EDIT_PORTFOLIO,
  EDIT_EXPERIENCE,
  REMOVE_EXPERIENCE,
  LOGOUT,
  REMOVE_PORTFOLIO_IMAGE,
} from './constants';
import { makeSelectViewProfilePage } from './selectors';
import {
  setLocalPhone,
  setLocalExperience,
  setLocalAboutMe,
  setLocalPersonalData,
  setLocalPortfolio,
  setLocalSkillsList,
  setLocalSkills,
  setEmail,
  getUser,
  setId,
  setPortfolioImages,
  setLoading,
} from './actions';
import { setToast } from 'utils/helper';
import { Field } from 'formik';

function* getCurrentUser({ payload = {} }) {
  yield put(setLoading(true));
  const { phone_verified = true, transientId } = payload;
  if (!isEmpty(transientId)) {
    const requestURL = `/user?experience=true&portfolio=true&transientId=${transientId}`;
    try {
      const user = yield call(
        request,
        requestURL,
        { method: 'GET' },
        true,
        false,
      );
      localStorage.setItem('loginData', JSON.stringify(user));
      yield put(setId(user.id));
      yield put(setLoginData(user));
      yield put(setLocalAboutMe(user.about));
      // yield put(setEmail(user.email.email));
      // localStorage.setItem('role', user.role);
      // yield put(
      //   setLocalPhone({
      //     number: user.phone.phone_number,
      //     verified: phone_verified ? user.phone.verified : false,
      //   }),
      // );
      yield put(
        setLocalPersonalData({
          firstName: user.first_name,
          profession: user.profession,
          city: user.city,
          state: user.state,
        }),
      );
      yield put(setLocalSkills(user.skills));
      yield put(setLocalExperience(user.experience));
      yield put(setLocalPortfolio(user.portfolio));
      yield put(setLoading(false));
    } catch (err) {
      yield put(setLoading(false));
      yield put(setLocalAboutMe(''));
      yield put(setLocalPhone({}));
      yield put(setLocalPortfolio([]));
      yield put(setLocalExperience([]));
      yield put(setLocalPersonalData([]));
      yield put(setLocalSkills([]));
      throw err;
    }
  }
}

export default function* profilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_USER, getCurrentUser);
}
