import { put, takeLatest, select, call, all } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import compact from 'lodash/compact';
import request from 'utils/request';
import { setLoginData, setToastData } from 'containers/LoginPage/actions';
import {
  setLocalAboutMe,
  setLocalPhone,
  setLocalPortfolio,
  setLocalExperience,
  setLocalPersonalData,
  setLocalSkills,
} from 'containers/ProfilePage/actions';
import { setToast, getDefaultState } from 'utils/helper';
import { Field } from 'formik';
import {
  UPLOAD_IMAGE,
  UPLOAD_BANK_IMAGE,
  SET_REMOTE_BANK_DETAILS,
  GET_BANK_DETAILS,
  GET_ADDRESS,
  EDIT_ADDRESS,
  EDIT_BANK_DETAILS,
  REMOVE_BANK_DETAILS,
  LOGOUT,
  REMOVE_BANK_IMAGES,
  SET_REMOTE_ADDRESS,
  REMOVE_ADDRESS,
} from './constants';
import { makeSelectKYCPage } from './selectors';
import {
  getUser,
  setId,
  setBankImages,
  setLoading,
  setLocalBankDetails,
  setLocalAddress,
  getBankDetails,
  getAddress,
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
  yield put(setLocalBankDetails([]));
  yield put(setLocalAddress({}));
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
  debugger;
}
async function getSignedUrlByBankId({ file_name, file_type, id, type }) {
  const requestURL = `/user/${id}/upload`;
  const url = await request(requestURL, {
    method: 'POST',
    data: { file_name, file_type, type },
  });
  debugger;
  return url;
}
function* uploadBankImage({ payload }) {
  const { files, type, id = 'new-bankDetails' } = payload;
  const kycPage = yield select(makeSelectKYCPage());
  const loginData = getDefaultState('loginData', {});
  const user_id = loginData.id;
  const TYPE_LOOKUP = {
    png: 'image/png',
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
  };
  const {
    bankImages: { images },
  } = kycPage;
  console.log(kycPage);
  try {
    yield put(
      setBankImages({
        id,
        images,
        done: false,
      }),
    );
    debugger;
    let newImages = yield all(
      Array.from(files).map(async file => {
        const lastIndex = file.name.lastIndexOf('.');
        const file_name = file.name.substr(0, lastIndex);
        const extension = file.name.substr(lastIndex + 1);

        const signedUrl = await getSignedUrlByBankId({
          file_name: `${file_name + new Date().getTime()}.${extension}`,
          file_type: 'image',
          type: TYPE_LOOKUP[extension],
          id: user_id,
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
      setBankImages({
        id,
        images: newImages,
        done: true,
      }),
    );
    debugger;
  } catch (err) {
    console.log(err);
    yield put(
      setToastData({
        message: typeof err === 'string' ? err : err.message,
        type: 'error',
      }),
    );
    yield put(setBankImages({ id: '', images: [], done: false }));
  }
}
function* setRemoteBankDetails({ payload }) {
  // yield put(setLoading(true));
  console.log('Bank details have been set', payload);
  const { bankDetailss } = payload;
  const kycPage = yield select(makeSelectKYCPage());
  const loginData = getDefaultState('loginData', {});
  const { id } = loginData;
  const {
    bankImages: { images },
    bankDetailss: existingbankDetails,
  } = kycPage;
  const requestURL = `/user/${id}/bank-details`;
  const data = {
    holder_name: bankDetailss.holder_name,
    bank_name: bankDetailss.bank_name,
    account_number: bankDetailss.account_number,
    ifsc_code: bankDetailss.ifsc_code,
    upi_code: bankDetailss.upi_code,
    proof_file: images.map(img => img.id),
  };
  // yield put(setLocalBankDetails(data));
  try {
    const newbankDetails = yield call(request, requestURL, {
      method: 'POST',
      data,
    });
    yield put(getBankDetails());
    // yield put(getUser());
    debugger;
    // yield put(setLoading(false));
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
function* editBankDetails({ payload }) {
  yield put(setLoading(true));
  const {
    bankDetailss: {
      id,
      holder_name,
      bank_name,
      account_number,
      ifsc_code,
      upi_code,
    },
  } = payload;
  const kycPage = yield select(makeSelectKYCPage());
  const loginData = getDefaultState('loginData', {});
  const user_id = loginData.id;
  const {
    bankImages: { images },
    bankDetailss: oldbankDetails,
  } = kycPage;
  const requestURL = `/user/${user_id}/bank-details/${id}`;
  const data = compact([
    holder_name && { op: 'replace', path: '/holder_name', value: holder_name },
    bank_name && { op: 'replace', path: '/bank_name', value: bank_name },
    account_number && {
      op: 'replace',
      path: '/account_number',
      value: account_number,
    },
    ifsc_code && { op: 'replace', path: '/ifsc_code', value: ifsc_code },
    upi_code && { op: 'replace', path: '/upi_code', value: upi_code },
    !isEmpty(images) && {
      op: 'replace',
      path: '/proof_file',
      value: images.map(img => img.id),
    },
  ]);
  if (isEmpty(data)) return;
  try {
    const newbankDetails = yield call(request, requestURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
      data,
    });
    const index = oldbankDetails.findIndex(p => p.id === id);
    oldbankDetails[index] = newbankDetails;
    yield put(setLoading(false));
    yield put(setLocalBankDetails(oldbankDetails));
    debugger;
    setToast({
      message: 'Successfully Edited Bank Details',
      mode: 'info',
    });
    yield put(getBankDetails());
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
function* getAllBankDetails({ payload = {} }) {
  yield put(setLoading(true));
  const kycPage = yield select(makeSelectKYCPage());
  const loginData = getDefaultState('loginData', {});
  const user_id = loginData.id;
  const requestURL = `/user/${user_id}/bank-details`;
  try {
    const response = yield call(request, requestURL, { method: 'GET' });
    localStorage.setItem('bankDetailss', JSON.stringify(response));
    yield put(setLocalBankDetails(response));
    console.log('this is bankDetailss ', localStorage.getItem('bankDetailss'));
    // debugger;
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLocalBankDetails([]));
    localStorage.removeItem('bankDetailss');
  }
}
function* removeBankDetails({ payload }) {
  const { id } = payload;
  const kycPage = yield select(makeSelectKYCPage());
  const loginData = getDefaultState('loginData', {});
  const user_id = loginData.id;
  const requestURL = `/user/${user_id}/bank-details/${id}`;
  try {
    yield call(request, requestURL, { method: 'DELETE' });
    yield put(getBankDetails());
    yield put(
      setToastData({
        message: 'Removed Bank Details',
        type: 'info',
      }),
    );
    debugger;
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
function* setRemoteAddress({ payload }) {
  console.log('Billing details have been set', payload);
  const { line_1, line_2, city, state, pincode, country, proof_type } = payload;
  const loginData = getDefaultState('loginData', {});
  const user_id = loginData.id;
  const kycPage = yield select(makeSelectKYCPage());
  const requestURL = `/user/${user_id}/address`;
  const data = {
    line_1,
    line_2,
    city,
    state,
    pincode,
    country,
    proof_type,
  };
  try {
    yield call(request, requestURL, {
      method: 'POST',
      data,
    });
    yield put(getAddress());
    debugger;
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

function* editAddress({ payload }) {
  // yield put(setLoading(true));
  const {
    id,
    line_1,
    line_2,
    city,
    state,
    pincode,
    country,
    proof_type,
  } = payload;
  const kycPage = yield select(makeSelectKYCPage());
  const loginData = getDefaultState('loginData', {});
  const user_id = loginData.id;
  const requestURL = `/user/${user_id}/address/${id}`;
  const data = compact([
    line_1 && { op: 'replace', path: '/line_1', value: payload.line_1 },
    line_2 && { op: 'replace', path: '/line_2', value: payload.line_2 },
    city && {
      op: 'replace',
      path: '/city',
      value: payload.city,
    },
    state && { op: 'replace', path: '/state', value: payload.state },
    pincode && { op: 'replace', path: '/pincode', value: payload.pincode },
    country && { op: 'replace', path: '/country', value: payload.country },
    proof_type && {
      op: 'replace',
      path: '/proof_type',
      value: payload.proof_type,
    },
  ]);
  if (isEmpty(data)) return;
  try {
    const newAddress = yield call(request, requestURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
      data,
    });
    // yield put(setLoading(false));
    yield put(setLocalAddress(newAddress));
    debugger;
    setToast({
      message: 'Successfully Edited Address',
      mode: 'info',
    });
    yield put(getAddress());
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

function* getAddressDetails({ payload = {} }) {
  yield put(setLoading(true));
  const kycPage = yield select(makeSelectKYCPage());
  // const { id, user_id } = kycPage;
  const loginData = getDefaultState('loginData', {});
  const user_id = loginData.id;
  const requestURL = `/user/${user_id}/address`;
  try {
    const response = yield call(request, requestURL, { method: 'GET' });
    localStorage.setItem('address', JSON.stringify(response));
    yield put(
      setLocalAddress({
        line_1: response.line_1,
        line_2: response.line_2,
        city: response.city,
        state: response.state,
        pincode: response.pincode,
        country: response.country,
        id: response.id,
        proof_type: response.proof_type,
      }),
    );
    yield put(setLoading(false));
    debugger;
  } catch (error) {
    yield put(setLocalAddress({}));
    localStorage.removeItem('address');
  }
}
function* removeAddress({ payload }) {
  const { id } = payload;
  const kycPage = yield select(makeSelectKYCPage());
  const loginData = getDefaultState('loginData', {});
  const user_id = loginData.id;
  const requestURL = `/user/${user_id}/address/${id}`;
  try {
    yield call(request, requestURL, { method: 'DELETE' });
    debugger;
    yield put(
      setToastData({
        message: 'Removed Address',
        type: 'info',
      }),
    );
    yield put(getAddress());
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
function* removeBankImage({ payload }) {
  const { index, id } = payload;
  const kycPage = yield select(makeSelectKYCPage());
  const {
    bankImages: { images },
  } = kycPage;
  images.splice(index, 1);
  yield put(
    setBankImages({
      id,
      images,
      done: true,
    }),
  );
}
export default function* KYCPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SET_REMOTE_BANK_DETAILS, setRemoteBankDetails);
  yield takeLatest(UPLOAD_BANK_IMAGE, uploadBankImage);
  yield takeLatest(GET_BANK_DETAILS, getAllBankDetails);
  yield takeLatest(EDIT_BANK_DETAILS, editBankDetails);
  yield takeLatest(REMOVE_BANK_DETAILS, removeBankDetails);
  yield takeLatest(REMOVE_BANK_IMAGES, removeBankImage);
  yield takeLatest(SET_REMOTE_ADDRESS, setRemoteAddress);
  yield takeLatest(GET_ADDRESS, getAddressDetails);
  yield takeLatest(EDIT_ADDRESS, editAddress);
  yield takeLatest(REMOVE_ADDRESS, removeAddress);
  yield takeLatest(LOGOUT, logout);
}
