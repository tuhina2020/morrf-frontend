import { call, put, select, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import request from 'utils/request';
import {
  GET_EXISTING_USER,
  SIGNIN_ALL_USERS,
  VERIFY_PASSWORD,
  FORGOT_PASSWORD,
  RESEND_CODE,
  SET_GLOBAL_CHOICE,
  SIGNIN_GOOGLE,
  GET_USER_BY_ID,
} from './constants';
import { makeSelectLoginPage } from './selectors';
import {
  setLoginData,
  setToastData,
  setChoice,
  signInAllUsers,
  getUserById,
  googleLogin,
} from './actions';

export function* getUserDataById() {
  const { login } = yield select(makeSelectLoginPage());
  const requestURL = `/user/${login.id}`;
  try {
    const existingUser = yield call(request, requestURL, {
      method: 'GET',
    });
    yield put(setLoginData(existingUser));
    localStorage.setItem('final', JSON.stringify(existingUser));
    if (existingUser.role) localStorage.setItem('role', existingUser.role);
  } catch (err) {
    localStorage.removeItem('final');
    localStorage.removeItem('token');
    yield put(setLoginData({}));
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

export function* getExistingUser({ payload }) {
  const { email, refreshToken, error, mode } = payload;
  const requestURL = '/user/check-user';
  try {
    const data = { email };
    if (!isEmpty(refreshToken)) localStorage.setItem('token', refreshToken);
    const existingUser = yield call(request, requestURL, {
      data,
      headers:
        mode === 'google'
          ? {
              'auth-type': 'google',
              Authorization: refreshToken,
            }
          : undefined,
    });
    if (get(existingUser, 'id')) {
      yield put(setLoginData(existingUser));
      localStorage.setItem('authType', existingUser.authType);
      // yield put(getUserById());
    }
  } catch (err) {
    console.log(refreshToken, err);
    if (!isEmpty(refreshToken) && err.code === 404)
      yield put(googleLogin({ email, refreshToken }));
    // else
    //   yield put(
    //     setToastData({
    //       message: typeof err === 'string' ? err : err.message,
    //       type: 'error',
    //     }),
    //   );
    localStorage.removeItem('loginData');
    localStorage.removeItem('token');
    yield put(setLoginData({ empty: 'none' }));
  }
}

export function* loginInGoogle({ payload }) {
  const { email, refreshToken, error } = payload;
  const requestURL = '/user/signup';
  console.log(refreshToken);
  try {
    if (error) throw error;
    const existingUser = yield call(request, requestURL, {
      headers: {
        'auth-type': 'google',
        Authorization: refreshToken,
      },
      data: { email, token: refreshToken },
    });
    if (existingUser && existingUser.token) {
      localStorage.setItem('loginData', JSON.stringify(existingUser.user));
      localStorage.setItem('token', existingUser.token);
      yield put(setLoginData(existingUser.user));
    }
    if (get(existingUser, 'user.role'))
      localStorage.setItem('role', existingUser.user.role);
  } catch (err) {
    console.log(err);
    localStorage.removeItem('loginData');
    localStorage.removeItem('token');
    // debugger;
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

export function* signInAllUsersSaga({ payload }) {
  const { email, password, verificationCode, mode } = payload;
  const requestURL = mode === 'existing-user' ? '/user/login' : '/user/signup';
  try {
    const data = {
      username: email,
      password,
      code: mode === 'new-user' ? verificationCode : undefined,
    };
    const existingUser = yield call(request, requestURL, {
      data,
    });
    if (existingUser && existingUser.token) {
      yield put(setLoginData(existingUser.user));
      localStorage.setItem('loginData', JSON.stringify(existingUser.user));
      localStorage.setItem('token', existingUser.token);
    }
    if (get(existingUser, 'user.role'))
      localStorage.setItem('role', existingUser.user.role);
    yield put(getUserById());
  } catch (err) {
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
    yield put(setLoginData({ empty: true }));
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
        message: typeof err === 'string' ? err : err.message,
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
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
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
    localStorage.setItem('loginData', JSON.stringify(existingUser));
    localStorage.setItem('role', role);
    yield put(setLoginData(existingUser));
    yield put(setChoice(role));
  } catch (err) {
    localStorage.removeItem('role');
    yield put(setChoice(''));
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
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
  yield takeLatest(SIGNIN_GOOGLE, loginInGoogle);
  yield takeLatest(GET_USER_BY_ID, getUserDataById);
}
