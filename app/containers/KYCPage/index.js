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
import {
  getAddress,
  editAddress,
  uploadBankImage,
  logout,
  removePortfolioImage,
  setBankImages,
  removeBankImages,
  setRemoteBankDetails,
  setRemoteAddress,
  getBankDetails,
  editBankDetails,
  removeBankDetails,
  removeAddress,
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
  getAddress,
  uploadBankImageData,
  editAddressData,
  logoutAction,
  setBankImg,
  removeBankImg,
  setBank,
  getBankDetails,
  editBankDetailsData,
  removeBankDetailsData,
  removeAddressData,
}) => {
    if (!isLoggedIn()) return <Redirect to="/login" />;
  useInjectReducer({ key: 'kycPage', reducer });

  useInjectSaga({ key: 'kycPage', saga, mode: RESTART_ON_REMOUNT });
  const {
    id,
    loading,
    bankImages,
    bankDetailss,
    address,
  } = kycPage;
  useEffect(() => {
    getBankDetails();
    getAddress();
  }, []);
  
  return (
    <KycDetails
     loading={loading}
     kyc={{
       ...kycPage,
       editbankDetails: kycPage.bankDetailss,
       editAddress:kycPage.address,
     }}
     saveFunctionMap={{
       bankDetailss: setBank,
       address: saveAddress,
       editbankDetails: editBankDetailsData,
       editAddress: editAddressData,
     }}
     uploadBankImageData={uploadBankImageData}
     removeBankDetails={removeBankDetailsData}
     removeAddress={removeAddressData}
     logout={logoutAction}
     removeBankImages={removeBankImg}
     setBankImages={setBankImg}
     bankImages={bankImages}
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
    uploadBankImageData: params =>
      dispatch(uploadBankImage({ ...params, type: 'bankDetailss' })),
    getBankDetails : () => dispatch(getBankDetails()),
    getAddress: () => dispatch(getAddress()),
    editAddressData: params => dispatch(editAddress(params)),
    removeAddressData: params => dispatch(removeAddress(params)),
    editBankDetailsData: params => dispatch(editBankDetails(params)),
    removeBankDetailsData: params => dispatch(removeBankDetails(params)),
    logoutAction: () => dispatch(logout()),
    setBankImg: params => dispatch(setBankImages(params)),
    removeBankImg: params => dispatch(removeBankImages(params)),
    setBank: params => dispatch(setRemoteBankDetails(params)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(KYCPage);
