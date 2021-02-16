import React, { useEffect } from 'react';

import KycDetails from 'templates/KycDetails/desktop';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { Redirect } from 'react-router-dom';

import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';

import { RESTART_ON_REMOUNT } from 'utils/constants';

import { setToast, isLoggedIn } from 'utils/helper';

import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectKYCPage } from './selectors';
import { logout } from 'containers/ProfilePage/actions';
import {
  getAddress,
  editAddress,
  uploadBankImage,
  uploadAddressImage,
  removePortfolioImage,
  removeAddressImages,
  setBankImages,
  setAddressImages,
  removeBankImages,
  setRemoteBankDetails,
  setRemoteAddress,
  getBankDetails,
  editBankDetails,
  removeBankDetails,
  removeAddress,
  setRemotePan,
  getUserPan,
  editPanDetails,
  uploadPanImage,
  setPanImage,
  removePanImage,
} from './actions';

import reducer from './reducer';

import saga from './saga';
import { isEmpty } from 'lodash';
import { queryByDisplayValue } from 'react-testing-library';

const KYCPage = ({
  loggedIn,
  kycPage,
  match,
  saveAddress,
  savePan,
  getAddress,
  getUserPan,
  editPanData,
  uploadBankImageData,
  uploadaddressImageData,
  uploadPanImageData,
  editAddressData,
  logoutAction,
  setBankImg,
  setAddressImg,
  setPanImg,
  removeBankImg,
  removeaddressImg,
  removePanImg,
  setBank,
  getBankDetails,
  editBankDetailsData,
  removeBankDetailsData,
  removeAddressData,
  removePanData,
}) => {
  if (!isLoggedIn()) return <Redirect to="/login" />;
  useInjectReducer({ key: 'kycPage', reducer });

  useInjectSaga({ key: 'kycPage', saga, mode: RESTART_ON_REMOUNT });
  const {
    id,
    loading,
    bankImages,
    addressImages,
    bankDetailss,
    address,
    panDetails,
    panImage,
  } = kycPage;
  useEffect(() => {
    getBankDetails();
    getAddress();
    getUserPan();
  }, []);

  return (
    <KycDetails
      loading={loading}
      kyc={{
        ...kycPage,
        editbankDetails: kycPage.bankDetailss,
        editAddress: kycPage.address,
        editpanDetails: kycPage.panDetails,
      }}
      saveFunctionMap={{
        bankDetailss: setBank,
        address: saveAddress,
        panDetails: savePan,
        editbankDetails: editBankDetailsData,
        editAddress: editAddressData,
        editpanDetails: editPanData,
      }}
      uploadBankImageData={uploadBankImageData}
      uploadaddressImageData={uploadaddressImageData}
      uploadPanImageData={uploadPanImageData}
      removeBankDetails={removeBankDetailsData}
      removeAddress={removeAddressData}
      logout={logoutAction}
      removeBankImages={removeBankImg}
      removeaddressImages={removeaddressImg}
      removePanImage={removePanImg}
      setBankImages={setBankImg}
      setAddressImages={setAddressImg}
      setPanImage={setPanImg}
      bankImages={bankImages}
      addressImages={addressImages}
      panImage={panImage}
    />
  );
};
KYCPage.propTypes = { responsiveData: PropTypes.object };

const mapStateToProps = createStructuredSelector({
  kycPage: makeSelectKYCPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveAddress: params => dispatch(setRemoteAddress(params)),
    savePan: params => dispatch(setRemotePan(params)),
    uploadBankImageData: params =>
      dispatch(uploadBankImage({ ...params, type: 'bankDetailss' })),
    uploadaddressImageData: params =>
      dispatch(uploadAddressImage({ ...params, type: 'address' })),
    uploadPanImageData: params =>
      dispatch(uploadPanImage({ ...params, type: 'panDetails' })),
    getBankDetails: () => dispatch(getBankDetails()),
    getAddress: () => dispatch(getAddress()),
    getUserPan: () => dispatch(getUserPan()),
    editAddressData: params => dispatch(editAddress(params)),
    removeAddressData: params => dispatch(removeAddress(params)),
    editBankDetailsData: params => dispatch(editBankDetails(params)),
    removeBankDetailsData: params => dispatch(removeBankDetails(params)),
    editPanData: params => dispatch(editPanDetails(params)),
    logoutAction: () => dispatch(logout()),
    setBankImg: params => dispatch(setBankImages(params)),
    setAddressImg: params => dispatch(setAddressImages(params)),
    setPanImg: params => dispatch(setPanImage(params)),
    removeBankImg: params => dispatch(removeBankImages(params)),
    removeaddressImg: params => dispatch(removeAddressImages(params)),
    setBank: params => dispatch(setRemoteBankDetails(params)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(KYCPage);
