import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SEND_EMAIL } from 'containers/LandingPage/constants';
import { sendEmailStatus } from 'containers/LandingPage/actions';

import request from 'utils/request';
import { makeSelectLandingPage } from 'containers/LandingPage/selectors';

export function* sendEmail() {
  // Select username from store
  const { email } = yield select(makeSelectLandingPage());
  const requestURL =
    'https://0ddtvni7bl.execute-api.ap-southeast-1.amazonaws.com/prod/subscriberEmail';

  try {
    const data = { email };
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify(data),
      },
    });
    yield put(sendEmailStatus(true));
  } catch (err) {
    yield put(sendEmailStatus(false));
  }
}

// Individual exports for testing
export default function* landingPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SEND_EMAIL, sendEmail);
}
