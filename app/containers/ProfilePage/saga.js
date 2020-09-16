import { put, takeLatest, select, call, all } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
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
} from './constants';
import { makeSelectProfilePage } from './selectors';
import {
  setLocalPhone,
  setLocalExperience,
  setLocalAboutMe,
  setLocalPersonalData,
  setLocalPortfolio,
  setLocalSkillsList,
  setLocalSkills,
} from './actions';

async function getSignedUrlById({ file_name, file_type, id }) {
  const requestURL = `/user/${id}`;
  try {
    const url = await request(requestURL, {
      method: 'POST',
      data: { file_name, file_type },
    });
    debugger;
    return url;
  } catch (err) {
    console.log(err);
    debugger;
  }
}

function* uploadImage({ payload }) {
  const { files } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  try {
    const res = yield all(
      files.map(async file => {
        const signedUrl = await getSignedUrlById({
          file_name: file.name,
          file_type: file.type,
          id: profilePage.id,
        });
        const uploadResponse = call(request, signedUrl, {
          method: 'POST',
          data: { file },
        });
        debugger;
        return uploadResponse;
      }),
    );
    debugger;
  } catch (err) {
    console.log(err);
    debugger;
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
  }
}

function* setRemoteSkills({ payload }) {
  console.log('we are ssetting skills here', payload.skills);
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}`;
  try {
    const data = [
      { op: 'add', path: '/skills', value: map(payload.skills, 'name') },
    ];
    const user = yield call(request, requestURL, {
      method: 'PATCH',
      data,
    });

    if (!isEmpty(user)) {
      localStorage.setItem('loginData', JSON.stringify(user));
      debugger;
      yield put(setLocalSkills(payload.skills));
    }
  } catch (err) {
    console.log(err);
    debugger;
    yield put(setLocalSkills([]));
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
  }
}

function* sendVerificationCode({ payload }) {
  console.log(payload.phone, 'sent code 1234');
  // else alert('Enter a valid phone number');
}

function* verifyPhone({ payload }) {
  console.log('Phone verified', payload.phone, 'CODE ', payload.code);
  yield put(setLocalPhone({ number: payload.phone, verified: true }));
}

function* setRemoteExperience({ payload }) {
  console.log('Experience has been set', payload);
  debugger;
  const { experience, newExperience } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}/experience`;
  try {
    const user = yield call(request, requestURL, {
      method: 'POST',
      data: experience,
    });
    debugger;
    if (!isEmpty(user)) {
      localStorage.setItem('loginData', JSON.stringify(user));
      debugger;
      yield put(setLocalExperience(user.experience));
    }
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
  }
}

function* getUser() {
  const profilePage = yield select(makeSelectProfilePage());
  if (profilePage && profilePage.id) {
    const requestURL = `/user/${profilePage.id}?experience=true&portfolio=true`;
    try {
      const user = yield call(request, requestURL, {
        method: 'GET',
      });
      localStorage.setItem('loginData', JSON.stringify(user));
      yield put(setLocalAboutMe(user.about));
      yield put(setLocalPhone({ number: user.phone_number, verified: true }));
    } catch (err) {
      yield put(setLocalAboutMe(''));
      yield put(setLocalPhone({}));
    }
  }
}

function* setRemoteAboutMe({ payload }) {
  console.log('About has been set', payload);
  const { about } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}`;
  yield put(setLocalAboutMe(about));
  try {
    const data = [{ op: 'add', path: '/about', value: about }];
    const user = yield call(request, requestURL, {
      method: 'PATCH',
      data,
    });
    if (!isEmpty(user)) {
      localStorage.setItem('loginData', JSON.stringify(user));
      yield put(setLocalAboutMe(user.about));
    }
  } catch (err) {
    console.log(err);
    yield put(setLocalAboutMe(''));
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
  }
}

function* setRemotePersonalData({ payload }) {
  console.log('Personal Data has been set', payload);
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}`;
  try {
    const data = [
      { op: 'add', path: '/first_name', value: payload.firstName },
      { op: 'add', path: '/second_name', value: payload.lastName },
      { op: 'add', path: '/profession', value: payload.profession },
      { op: 'add', path: '/city', value: payload.city },
      { op: 'add', path: '/state', value: payload.state },
    ];
    const user = yield call(request, requestURL, {
      method: 'PATCH',
      data,
    });

    if (!isEmpty(user)) {
      localStorage.setItem('loginData', JSON.stringify(user));
      debugger;
      yield put(setLocalPersonalData(payload));
    }
  } catch (err) {
    console.log(err);
    debugger;
    yield put(setLocalPersonalData({}));
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
  }
}

function* setRemotePortfolio({ payload }) {
  console.log('Portfolio Data has been set', payload);

  const { portfolio, newPortfolio } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}/portfolio`;
  debugger;
  try {
    const user = yield call(request, requestURL, {
      method: 'POST',
      data: portfolio,
    });
    debugger;
    if (!isEmpty(user)) {
      localStorage.setItem('loginData', JSON.stringify(user));
      debugger;
      yield put(setLocalPortfolio(user.portfolio));
    }
  } catch (err) {
    console.log(err);
    // yield put(setLocalPortfolio([]));
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
  }
}

function* setRemotePhone({ payload }) {
  const { phone, otp } = payload;
  const profilePage = yield select(makeSelectProfilePage());

  console.log('About has been set', payload);
  debugger;
  const requestURL = `/user/${profilePage.id}`;

  try {
    const data = [{ op: 'add', path: '/phone_number', value: phone }];
    const user = yield call(request, requestURL, {
      method: 'PATCH',
      data,
    });

    if (!isEmpty(user)) {
      localStorage.setItem('loginData', JSON.stringify(user));
      yield put(setLocalPhone({ number: user.phone_number, verified: true }));
    }
  } catch (err) {
    console.log(err);
    yield put(setLocalPhone({}));
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
  }
}

export default function* profilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SEND_VERIFICATION, sendVerificationCode);
  yield takeLatest(VERIFY_PHONE, verifyPhone);
  yield takeLatest(SET_REMOTE_PHONE, setRemotePhone);
  yield takeLatest(SET_REMOTE_EXPERIENCE, setRemoteExperience);
  yield takeLatest(SET_REMOTE_ABOUT_ME, setRemoteAboutMe);
  yield takeLatest(SET_REMOTE_PERSONAL_DATA, setRemotePersonalData);
  yield takeLatest(SET_REMOTE_PORTFOLIO, setRemotePortfolio);
  yield takeLatest(SET_REMOTE_SKILLS, setRemoteSkills);
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(UPLOAD_IMAGE, uploadImage);
}
