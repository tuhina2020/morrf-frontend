import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_EXISTING_USER,
  SIGNIN_ALL_USERS,
  VERIFY_PASSWORD,
  FORGOT_PASSWORD,
  RESEND_CODE,
  SET_GLOBAL_CHOICE,
  SIGNIN_GOOGLE,
} from 'containers/LoginPage/constants';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import request from 'utils/request';
import { makeSelectLoginPage } from 'containers/LoginPage/selectors';
import {
  setLoginData,
  setToastData,
  setChoice,
  signInAllUsers,
} from './actions';

export function* getExistingUser({ payload }) {
  const { email } = payload;
  const requestURL = '/user/check-user';
  try {
    const data = { email };
    const existingUser = yield call(request, requestURL, {
      data,
    });
    if (existingUser && existingUser.id) {
      yield put(setLoginData(existingUser));
      localStorage.setItem('loginData', JSON.stringify(existingUser));
    }
    if (existingUser.role) localStorage.setItem('role', existingUser.role);
  } catch (err) {
    yield put(setLoginData({}));
  }
}

export function* signInGoogle({ payload }) {
  const { email, code } = payload;
  const requestURL = '/user/login';
  try {
    const data = {
      // username: email,
      code,
    };

    const existingUser = yield call(request, requestURL, {
      headers: {
        authType: 'google',
      },
      data,
    });
    if (existingUser && existingUser.token) {
      localStorage.setItem('loginData', JSON.stringify(existingUser.user));
      localStorage.setItem('token', existingUser.token);
      yield put(setLoginData(existingUser.user));
    }
    if (get(existingUser, 'user.role'))
      localStorage.setItem('role', existingUser.user.role);
  } catch (err) {
    yield put(
      setToastData({
        message: err,
        type: 'info',
      }),
    );
    localStorage.removeItem('loginData');
    localStorage.removeItem('token');
  }
}

export function* signInAllUsersSaga({ payload }) {
  const { email, password, verificationCode } = payload;
  const requestURL = isEmpty(verificationCode) ? '/user/login' : '/user/signup';
  try {
    const data = {
      username: email,
      password,
      code: isEmpty(verificationCode) ? undefined : verificationCode,
    };
    const existingUser = yield call(request, requestURL, {
      data,
    });
    if (existingUser && existingUser.token) {
      localStorage.setItem('loginData', JSON.stringify(existingUser.user));
      localStorage.setItem('token', existingUser.token);
      yield put(setLoginData(existingUser.user));
    }
    if (get(existingUser, 'user.role'))
      localStorage.setItem('role', existingUser.user.role);
  } catch (err) {
    yield put(
      setToastData({
        message: err,
        type: 'info',
      }),
    );
    localStorage.removeItem('loginData');
    localStorage.removeItem('token');
  }
}

export function* forgotPassword({ payload }) {
  const { email } = payload;
  const { login } = yield select(makeSelectLoginPage());
  const requestURL = `/user/${login.id}/forgot-password`;
  try {
    const data = {
      username: email,
    };
    yield call(request, requestURL, {
      data,
    });
  } catch (err) {
    yield put(
      setToastData({
        message: 'Error sending verification code',
        type: 'error',
      }),
    );
  }
}

export function* verifyPassword({ payload }) {
  const { email, password, verificationCode } = payload;
  const { login } = yield select(makeSelectLoginPage());
  const requestURL = `/user/${login.id}/confirm-forgot-password`;
  try {
    const data = {
      username: email,
      password,
      code: verificationCode,
    };

    const response = yield call(request, requestURL, {
      data,
    });

    yield put(signInAllUsers({ email, password }));
    yield put(
      setToastData({
        message: response.message,
        type: 'info',
      }),
    );
  } catch (err) {
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
    yield put(setLoginData({}));
    localStorage.removeItem('loginData');
    localStorage.removeItem('token');
  }
}

export function* resendVerificationCode({ payload }) {
  const { email } = payload;
  const requestURL = '/user/resend-verification';
  try {
    const data = {
      username: email,
    };
    const response = yield call(request, requestURL, {
      data,
    });
    yield put(
      setToastData({
        message: response.message,
        type: 'info',
      }),
    );
  } catch (err) {
    yield put(
      setToastData({
        message: err,
        type: 'info',
      }),
    );
  }
}

export function* setGlobalChoice({ payload }) {
  const { role } = payload;
  const { login } = yield select(makeSelectLoginPage());
  const requestURL = `/user/${login.id}`;

  try {
    const data = [{ op: 'add', path: '/role', value: role }];
    const existingUser = yield call(request, requestURL, {
      method: 'PATCH',
      data,
    });
    yield put(setLoginData(existingUser.user));
    localStorage.setItem('role', role);
    yield put(setChoice(role));
  } catch (err) {
    localStorage.removeItem('role');
    yield put(
      setToastData({
        message: err,
        type: 'error',
      }),
    );
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_EXISTING_USER, getExistingUser);
  yield takeLatest(SIGNIN_ALL_USERS, signInAllUsersSaga);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(VERIFY_PASSWORD, verifyPassword);
  yield takeLatest(RESEND_CODE, resendVerificationCode);
  yield takeLatest(SET_GLOBAL_CHOICE, setGlobalChoice);
  yield takeLatest(SIGNIN_GOOGLE, signInGoogle);
}
