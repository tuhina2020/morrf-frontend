import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_AVAILABLE_SKILLS,
  SEND_VERIFICATION,
  VERIFY_PHONE,
  SET_REMOTE_EXPERIENCE,
  SET_REMOTE_ABOUT_ME,
  SET_REMOTE_PERSONAL_DATA,
  SET_REMOTE_PORTFOLIO,
  SET_REMOTE_SKILLS,
} from './constants';
import isEmpty from 'lodash/isEmpty';
import { makeSelectProfilePage } from './selectors';

import {
  setPhone,
  setLocalExperience,
  setLocalAboutMe,
  setLocalPersonalData,
  setLocalPortfolio,
  setLocalSkillsList,
  setLocalSkills,
} from './actions';

function* getSkills({ payload }) {
  const { search } = payload;
  // const { getAllSkills } = yield select(makeSelectProfilePage());
  const allSkills = [
    {
      id: '1234',
      name: 'furnace design',
    },
    {
      id: '2452',
      name: 'UI/UX Research',
    },
    {
      id: '5469-b',
      name: 'Town planning',
    },
    {
      id: '123-b',
      name: 'interior design',
    },
    {
      id: '2451',
      name: 'Illustration Tools',
    },
    {
      id: '5469-a',
      name: '3ds Max',
    },
    {
      id: '123-a',
      name: 'furniture design',
    },
    {
      id: '245',
      name: 'UI/UX',
    },
    {
      id: '546-es',
      name: 'Architecture',
    },
    {
      id: '245-bx',
      name: 'Illustrator',
    },
    {
      id: '546',
      name: 'Photoshop',
    },
  ];
  if (isEmpty(search)) {
    yield put(setLocalSkillsList(allSkills));
  } else {
    const filteredSkills = allSkills.filter(item =>
      item.name.toLowerCase().startsWith(search),
    );
    console.log('WE ARE HERE', filteredSkills);
    yield put(setLocalSkillsList(filteredSkills));
  }
}

function* setRemoteSkills({ payload }) {
  console.log('we are ssetting skills here', payload.skills);
  debugger;
  yield put(setLocalSkills(payload.skills));
}

function* sendVerificationCode({ payload }) {
  console.log(payload.phone, 'sent code 1234');
  // else alert('Enter a valid phone number');
}

function* verifyPhone({ payload }) {
  console.log('Phone verified', payload.phone, 'CODE ', payload.code);
  yield put(setPhone({ number: payload.phone, verified: true }));
}

function* setRemoteExperience({ payload }) {
  console.log('Experience has been set', payload);
  yield put(setLocalExperience(payload.experience));
  // yield put(setPhone({ number: payload.phone, verified: true }));
}

function* setRemoteAboutMe({ payload }) {
  if (!isEmpty(payload.about)) {
    console.log('About has been set', payload);
    yield put(setLocalAboutMe(payload.about));
  }
}

function* setRemotePersonalData({ payload }) {
  console.log('Personal Data has been set', payload);
  yield put(setLocalPersonalData(payload));
}

function* setRemotePortfolio({ payload }) {
  console.log('Portfolio Data has been set', payload);
  yield put(setLocalPortfolio(payload.portfolio));
}

export default function* profilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SEND_VERIFICATION, sendVerificationCode);
  yield takeLatest(VERIFY_PHONE, verifyPhone);
  yield takeLatest(SET_REMOTE_EXPERIENCE, setRemoteExperience);
  yield takeLatest(SET_REMOTE_ABOUT_ME, setRemoteAboutMe);
  yield takeLatest(SET_REMOTE_PERSONAL_DATA, setRemotePersonalData);
  yield takeLatest(SET_REMOTE_PORTFOLIO, setRemotePortfolio);
  yield takeLatest(GET_AVAILABLE_SKILLS, getSkills);
  yield takeLatest(SET_REMOTE_SKILLS, setRemoteSkills);
}
