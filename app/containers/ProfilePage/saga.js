import { put, takeLatest, select, call, all } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import compact from 'lodash/compact';
import request from 'utils/request';
import { setLoginData, setToastData } from 'containers/LoginPage/actions';
import { setToast, getDefaultState } from 'utils/helper';
import { Field } from 'formik';
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
  SET_REMOTE_BANK_DETAILS,
  GET_ALL_SKILLS,
  REMOVE_PORTFOLIO,
  EDIT_PORTFOLIO,
  EDIT_EXPERIENCE,
  REMOVE_EXPERIENCE,
  LOGOUT,
  REMOVE_PORTFOLIO_IMAGE,
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
  setEmail,
  getUser,
  setId,
  setPortfolioImages,
  setLoading,
  setProfileImage,
  setLocalBankDetails,
} from './actions';

function* logout() {
  localStorage.removeItem('loginData');
  localStorage.removeItem('authType');
  // localStorage.removeItem('role');
  localStorage.removeItem('skillList');
  localStorage.removeItem('token');
  yield put(setLoginData({}));
  yield put(setLocalAboutMe(''));
  yield put(setLocalPhone({}));
  yield put(setLocalPortfolio([]));
  yield put(setLocalExperience([]));
  yield put(setLocalPersonalData({}));
  yield put(setLocalSkills([]));
  yield put(setLocalBankDetails({}));
  yield put(setId(''));
  setToast({
    message: 'You have been logged out.',
    type: 'info',
  });
}
async function getSignedUrlById({ file_name, file_type, id, type }) {
  const requestURL = `/user/${id}/upload`;
  const url = await request(requestURL, {
    method: 'POST',
    data: { file_name, file_type, type },
  });
  return url;
}

function* uploadImage({ payload }) {
  const { files, type, id = 'new-portfolio' } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const TYPE_LOOKUP = {
    png: 'image/png',
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
  };
  const {
    portfolioImages: { images },
  } = profilePage;
  console.log(profilePage);
  try {
    yield put(
      setPortfolioImages({
        id,
        images,
        done: false,
      }),
    );
    let newImages = yield all(
      Array.from(files).map(async file => {
        const lastIndex = file.name.lastIndexOf('.');
        const file_name = file.name.substr(0, lastIndex);
        const extension = file.name.substr(lastIndex + 1);

        const signedUrl = await getSignedUrlById({
          file_name: `${file_name + new Date().getTime()}.${extension}`,
          file_type: type,
          type: TYPE_LOOKUP[extension],
          id: profilePage.id,
        });
        const form = new FormData();

        const ALL_FIELDS = signedUrl.url.fields;
        Object.keys(ALL_FIELDS).forEach(field => {
          form.append(field, ALL_FIELDS[field]);
        });
        form.append('file', file);
        const uploadResponse = await request(
          signedUrl.url.url,
          {
            method: 'POST',
            form,
          },
          false,
        );
        return uploadResponse.success ? signedUrl.id : undefined;
      }),
    );
    if (compact(newImages).length < files.length)
      throw 'Error Uploading Images';

    newImages = [...images, ...newImages.map(img => ({ id: img }))];
    yield put(
      setPortfolioImages({
        id,
        images: newImages,
        done: true,
      }),
    );
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
    yield put(setPortfolioImages({ id: '', images: [], done: false }));
  }
}

function* setRemoteSkills({ payload }) {
  console.log('we are ssetting skills here', payload.skills);
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}`;
  try {
    const data = [
      { op: 'add', path: '/skills', value: map(payload.skills, 'id') },
    ];
    yield call(request, requestURL, { method: 'PATCH', data });
    yield put(getUser());
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* sendVerificationCode({ payload }) {
  const { phone } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}/resend-phone-verification`;
  try {
    const user = yield call(request, requestURL, {
      method: 'POST',
      data: {},
    });
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* verifyPhone({ payload }) {
  const { phone, code } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}/confirm-phonenumber`;
  try {
    yield call(request, requestURL, {
      method: 'POST',
      data: {
        code,
      },
    });
    yield put(getUser());
  } catch (err) {
    console.log('err', err);
    setToast({
      message: typeof err === 'string' ? err : err.message,
      type: 'error',
    });
  }
}

function* setRemoteExperience({ payload }) {
  console.log('Experience has been set', payload);
  const { experience, newExperience } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}/experience`;
  try {
    yield call(request, requestURL, {
      method: 'POST',
      data: experience,
    });
    yield put(getUser());
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* setCurrentUser({ payload }) {
  const { user, phone_verified = true } = payload;
  try {
    localStorage.setItem('loginData', JSON.stringify(user));
    yield put(setId(user.id));
    yield put(setLoginData(user));
    yield put(setLocalAboutMe(user.about));
    yield put(setEmail(user.email.email));
    // localStorage.setItem('role', user.role);
    yield put(
      setLocalPhone({
        number: user.phone.phone_number,
        verified: phone_verified ? user.phone.verified : false,
      }),
    );
    yield put(
      setLocalPersonalData({
        firstName: user.first_name,
        lastName: user.second_name,
        profession: user.profession,
        city: user.city,
        state: user.state,
      }),
    );
    yield put(
      setLocalBankDetails({
        holderName: user.holderName,
        bankName: user.bankName,
        accountNumber: user.accountNumber,
        ifscCode: user.ifscCode,
      }),
    ); 
    yield put(setLocalSkills(user.skills));
    yield put(setLocalExperience(user.experience));
    yield put(setLocalPortfolio(user.portfolio));
  } catch (err) {
    yield put(setLocalAboutMe(''));
    yield put(setLocalPhone({}));
    yield put(setLocalBankDetails({}));
    yield put(setLocalPortfolio([]));
    yield put(setLocalExperience([]));
    yield put(setLocalPersonalData([]));
    yield put(setLocalSkills([]));
    throw err;
  }
}

function* getCurrentUser({ payload = {} }) {
  yield put(setLoading(true));
  const { phone_verified = true } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const loginData = getDefaultState('loginData', {});
  const id = !isEmpty(profilePage.id) ? profilePage.id : loginData.id;
  if (!isEmpty(id)) {
    const requestURL = `/user/${id}?experience=true&portfolio=true`;
    try {
      const user = yield call(request, requestURL, { method: 'GET' });
      localStorage.setItem('loginData', JSON.stringify(user));
      yield put(setId(user.id));
      yield put(setLoginData(user));
      yield put(setLocalAboutMe(user.about));
      yield put(setEmail(user.email.email));
      // localStorage.setItem('role', user.role);
      yield put(
        setLocalPhone({
          number: user.phone.phone_number,
          verified: phone_verified ? user.phone.verified : false,
        }),
      );
      yield put(
        setLocalPersonalData({
          firstName: user.first_name,
          lastName: user.second_name,
          profession: user.profession,
          city: user.city,
          state: user.state,
        }),
      );
      yield put(
        setLocalBankDetails({
          holderName: user.holderName,
          bankName: user.bankName,
          accountNumber: user.accountNumber,
          ifscCode: user.ifscCode,
        }),
      );
      yield put(setLocalSkills(user.skills));
      yield put(setLocalExperience(user.experience));
      yield put(setLocalPortfolio(user.portfolio));
      yield put(setLoading(false));
    } catch (err) {
      yield put(setLoading(false));
      yield put(setLocalAboutMe(''));
      yield put(setLocalBankDetails({}));
      yield put(setLocalPhone({}));
      yield put(setLocalPortfolio([]));
      yield put(setLocalExperience([]));
      yield put(setLocalPersonalData([]));
      yield put(setLocalSkills([]));
      throw err;
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
    yield call(request, requestURL, { method: 'PATCH', data });
    yield put(getUser());
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

/* function* setProfileImage({ payload }) {
  console.log('we are setting profile pic here', payload);
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}`;
  try {
    const data = [
      { op: 'add', path: '/image', value: payload.profileImage.id },
    ];
    yield call(request, requestURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
      data,
    });
    yield put(getUser());
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
} */

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
    yield call(request, requestURL, { method: 'PATCH', data });
    yield put(
      setToastData({
        message: 'Successfully edited personal details',
        type: 'info',
      }),
    );
    yield put(getUser());
  } catch (err) {
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* setRemotePortfolio({ payload }) {
  console.log('Portfolio Data has been set', payload);
  yield put(setLoading(true));
  const { portfolio } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const {
    portfolioImages: { images },
    portfolio: existingPortfolio,
  } = profilePage;
  const requestURL = `/user/${profilePage.id}/portfolio`;
  const data = {
    client: portfolio.client,
    project: portfolio.project,
    startYear: portfolio.startYear,
    endYear: portfolio.endYear,
    highlights: portfolio.highlights,
    files: images.map(img => img.id),
  };
  try {
    const newPortfolio = yield call(request, requestURL, {
      method: 'POST',
      data,
    });
    yield put(
      setToastData({
        message: 'Successfully edited portfolio',
        type: 'info',
      }),
    );
    yield put(getUser());
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* editPortfolio({ payload }) {
  yield put(setLoading(true));
  const {
    portfolio: { id, project, highlights, startYear, endYear, client, user_id },
  } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const {
    portfolioImages: { images },
    portfolio: oldPortfolio,
  } = profilePage;
  const requestURL = `/user/${user_id}/portfolio/${id}`;
  const data = compact([
    project && { op: 'replace', path: '/project', value: project },
    startYear && { op: 'replace', path: '/startYear', value: startYear },
    endYear && { op: 'replace', path: '/endYear', value: endYear },
    highlights && { op: 'replace', path: '/highlights', value: highlights },
    client && { op: 'replace', path: '/client', value: client },
    !isEmpty(images) && {
      op: 'replace',
      path: '/files',
      value: images.map(img => img.id),
    },
  ]);
  if (isEmpty(data)) return;
  try {
    const newPortfolio = yield call(request, requestURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
      data,
    });
    const index = oldPortfolio.findIndex(p => p.id === id);
    oldPortfolio[index] = newPortfolio;
    yield put(setLoading(false));
    yield put(setLocalPortfolio(oldPortfolio));
    setToast({
      message: 'Successfully Edited Portfolio',
      mode: 'info',
    });
  } catch (err) {
    yield put(setLoading(false));
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* editExperience({ payload }) {
  const {
    experience: {
      id,
      designation,
      highlights,
      startYear,
      endYear,
      company,
      present,
      user_id,
    },
  } = payload;
  const requestURL = `/user/${user_id}/experience/${id}`;
  const data = compact([
    designation && { op: 'replace', path: '/designation', value: designation },
    startYear && { op: 'replace', path: '/startYear', value: startYear },
    endYear && { op: 'replace', path: '/endYear', value: endYear },
    highlights && { op: 'replace', path: '/highlights', value: highlights },
    company && { op: 'replace', path: '/company', value: company },
    { op: 'replace', path: '/present', value: present },
  ]);
  if (isEmpty(data)) return;
  try {
    yield call(request, requestURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
      data,
    });
    yield put(getUser());
    setToast({
      message: 'Successfully Edited Experience',
      mode: 'info',
    });
  } catch (err) {
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* removePortfolio({ payload }) {
  const { id } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}/portfolio/${id}`;
  try {
    yield call(request, requestURL, { method: 'DELETE' });
    yield put(getUser());
    yield put(
      setToastData({
        message: 'Removed portfolio',
        type: 'info',
      }),
    );
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}
function* setRemoteBank({ payload }) {
  console.log('Bank details have been set', payload);
  const { bankDetails, user_id } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${user_id}/bank-details`;
  const data = {
    holderName: bankDetails.holderName,
    bankName: bankDetails.bankName,
    accountNumber: bankDetails.accountNumber,
    ifscCode: bankDetails.ifscCode,
  };
  yield put(setLocalBankDetails(data));
  try {
    yield call(request, requestURL, {
      method: 'POST',
      data,
    });
    yield put(getUser());
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* removeExperience({ payload }) {
  const { id } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const requestURL = `/user/${profilePage.id}/experience/${id}`;
  try {
    yield call(request, requestURL, { method: 'DELETE' });
    yield put(
      setToastData({
        message: 'Removed Experience',
        type: 'info',
      }),
    );
    yield put(getUser());
  } catch (err) {
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
  }
}

function* setRemotePhone({ payload }) {
  const { phone, otp } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  console.log('Phone has been set', payload);
  const requestURL = `/user/${profilePage.id}`;
  try {
    const data = [{ op: 'add', path: '/phone_number', value: phone }];
    yield call(request, requestURL, {
      method: 'PATCH',
      data,
      headers: { 'Content-Type': 'application/json-patch+json' },
    });
    yield put(
      setToastData({
        message: 'Code sent to your mobile',
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

function* getAllSkills() {
  const requestURL =
    'https://p00egotma6.execute-api.ap-southeast-1.amazonaws.com/prod/skills';
  try {
    const response = yield call(request, requestURL, { method: 'GET' }, false);
    yield put(setLocalSkillsList(response));
    localStorage.setItem('skillsList', JSON.stringify(response));
  } catch (error) {
    yield put(setLocalSkillsList([]));
    localStorage.removeItem('skillsList');
  }
}

function* removePortfolioImage({ payload }) {
  const { index, id } = payload;
  const profilePage = yield select(makeSelectProfilePage());
  const {
    portfolioImages: { images },
  } = profilePage;
  images.splice(index, 1);
  yield put(
    setPortfolioImages({
      id,
      images,
      done: true,
    }),
  );
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
  yield takeLatest(GET_USER, getCurrentUser);
  yield takeLatest(UPLOAD_IMAGE, uploadImage);
  yield takeLatest(GET_ALL_SKILLS, getAllSkills);
  yield takeLatest(REMOVE_PORTFOLIO, removePortfolio);
  yield takeLatest(EDIT_PORTFOLIO, editPortfolio);
  yield takeLatest(EDIT_EXPERIENCE, editExperience);
  yield takeLatest(REMOVE_EXPERIENCE, removeExperience);
  yield takeLatest(REMOVE_PORTFOLIO_IMAGE, removePortfolioImage);
  yield takeLatest(SET_REMOTE_BANK_DETAILS, setRemoteBank);
  yield takeLatest(LOGOUT, logout);
}
