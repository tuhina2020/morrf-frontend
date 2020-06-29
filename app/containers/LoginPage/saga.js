import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_EXISTING_USER,
  SIGN_IN_EXISTING,
} from 'containers/LoginPage/constants';
import { setExistingUser, setLoginData } from 'containers/LoginPage/actions';

import request from 'utils/request';
import { makeSelectLoginPage } from 'containers/LoginPage/selectors';

export function* getExistingUser({ payload }) {
  const { email } = payload;
  yield put(
    setExistingUser({ name: 'Prashanth Sarvepalli', exists: true, email }),
  );
  // Select username from store
  // const { email, name, source } = yield select(makeSelectLoginPage());
  // const requestURL =
  //   'https://b6qzcm7x4m.execute-api.ap-southeast-1.amazonaws.com/prod/subscribe';
  // try {
  //   const data = {
  //     email,
  //     name,
  //     source,
  //     timestamp: new Date().toISOString(),
  //   };
  //   yield call(request, requestURL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   yield put(sendEmailStatus(true));
  // } catch (err) {
  //   yield put(sendEmailStatus(false));
  // }
}

export function* signInEmail(payload) {
  const { email, password } = payload;
  yield put(
    setLoginData({
      success: true,
      name: 'Prashanth Sarvepalli',
      token: 'xyz',
      username: 'lolmax',
    }),
  );
}

// Individual exports for testing
export default function* landingPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_EXISTING_USER, getExistingUser);
  yield takeLatest(SIGN_IN_EXISTING, signInEmail);
}
