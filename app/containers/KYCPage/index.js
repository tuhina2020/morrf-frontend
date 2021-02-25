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
  setRemoteSignature,
  editSignature,
  uploadSignatureImage,
  setSignatureImage,
  removeSignatureImage,
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
  saveSignature,
  getAddress,
  getUserPan,
  editPanData,
  editSignatureData,
  uploadSignatureImageData,
  uploadBankImageData,
  uploadaddressImageData,
  uploadPanImageData,
  editAddressData,
  logoutAction,
  setBankImg,
  setAddressImg,
  setPanImg,
  setSignatureImg,
  removeBankImg,
  removeaddressImg,
  removePanImg,
  removeSignatureImg,
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
    signature,
    panImage,
    signatureImage,
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
        editSignatureDetails: kycPage.signature,
      }}
      saveFunctionMap={{
        bankDetailss: setBank,
        address: saveAddress,
        panDetails: savePan,
        signature: saveSignature,
        editbankDetails: editBankDetailsData,
        editAddress: editAddressData,
        editpanDetails: editPanData,
        editSignatureDetails: editSignatureData,
      }}
      uploadBankImageData={uploadBankImageData}
      uploadaddressImageData={uploadaddressImageData}
      uploadPanImageData={uploadPanImageData}
      uploadSignatureImageData={uploadSignatureImageData}
      removeBankDetails={removeBankDetailsData}
      removeAddress={removeAddressData}
      logout={logoutAction}
      removeBankImages={removeBankImg}
      removeaddressImages={removeaddressImg}
      removePanImage={removePanImg}
      removeSignatureImage={removeSignatureImg}
      setBankImages={setBankImg}
      setAddressImages={setAddressImg}
      setPanImage={setPanImg}
      setSignatureImage={setSignatureImg}
      bankImages={bankImages}
      addressImages={addressImages}
      panImage={panImage}
      signatureImage={signatureImage}
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
    saveSignature: params => dispatch(setRemoteSignature(params)),
    uploadBankImageData: params =>
      dispatch(uploadBankImage({ ...params, type: 'bankDetailss' })),
    uploadaddressImageData: params =>
      dispatch(uploadAddressImage({ ...params, type: 'address' })),
    uploadPanImageData: params =>
      dispatch(uploadPanImage({ ...params, type: 'panDetails' })),
    uploadSignatureImageData: params =>
      dispatch(uploadSignatureImage({ ...params, type: 'signature' })),
    getBankDetails: () => dispatch(getBankDetails()),
    getAddress: () => dispatch(getAddress()),
    getUserPan: () => dispatch(getUserPan()),
    editAddressData: params => dispatch(editAddress(params)),
    removeAddressData: params => dispatch(removeAddress(params)),
    editBankDetailsData: params => dispatch(editBankDetails(params)),
    removeBankDetailsData: params => dispatch(removeBankDetails(params)),
    editPanData: params => dispatch(editPanDetails(params)),
    editSignatureData: params => dispatch(editSignature(params)),
    logoutAction: () => dispatch(logout()),
    setBankImg: params => dispatch(setBankImages(params)),
    setAddressImg: params => dispatch(setAddressImages(params)),
    setPanImg: params => dispatch(setPanImage(params)),
    setSignatureImg: params => dispatch(setSignatureImage(params)),
    removeBankImg: params => dispatch(removeBankImages(params)),
    removePanImg: params => dispatch(removePanImage(params)),
    removeaddressImg: params => dispatch(removeAddressImages(params)),
    removeSignatureImg: params => dispatch(removeSignatureImage(params)),
    setBank: params => dispatch(setRemoteBankDetails(params)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(KYCPage);
