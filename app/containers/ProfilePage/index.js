import React, { useEffect } from 'react';
import ProfileDetails from 'templates/ProfileDetails/desktop';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import { setToast, isLoggedIn } from 'utils/helper';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectProfilePage } from './selectors';
import {
  setEmail,
  setLocalPhone,
  sendVerificationCode,
  verifyPhone,
  setRemoteExperience,
  setRemoteAboutMe,
  setRemotePersonalData,
  setRemotePortfolio,
  setRemoteSkills,
  getSkills,
  setRemotePhone,
  getUser,
  uploadImage,
} from './actions';
import reducer from './reducer';
import saga from './saga';

const ProfilePage = ({
  profilePage,
  match,
  formVerifyPhone,
  sendCode,
  saveExperience,
  saveAboutMe,
  savePersonalDetails,
  savePortfolio,
  saveSkills,
  savePhone,
  getUserData,
  uploadImageData,
}) => {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga, mode: RESTART_ON_REMOUNT });
  const {
    params: { tabId },
  } = match;
  useEffect(() => {
    getUserData();
  }, [profilePage.id]);
  if (tabId === 'details')
    return (
      <ProfileDetails
        profile={{
          ...profilePage,
          contact: { phone: profilePage.phone, email: profilePage.email },
        }}
        saveFunctionMap={{
          experience: saveExperience,
          about: saveAboutMe,
          personal: savePersonalDetails,
          portfolio: savePortfolio,
          skills: saveSkills,
          contact: savePhone,
        }}
        verifyPhone={formVerifyPhone}
        sendCode={sendCode}
        uploadImageData={uploadImageData}
      />
    );
  return <div>LOL TTHIS IS EMPTY</div>;
};

ProfilePage.propTypes = {
  responsiveData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendCode: params => dispatch(sendVerificationCode(params)),
    formVerifyPhone: params => dispatch(verifyPhone(params)),
    saveExperience: params => dispatch(setRemoteExperience(params)),
    saveAboutMe: params => dispatch(setRemoteAboutMe(params)),
    savePersonalDetails: params => dispatch(setRemotePersonalData(params)),
    savePortfolio: params => dispatch(setRemotePortfolio(params)),
    saveSkills: params => dispatch(setRemoteSkills(params)),
    savePhone: params => dispatch(setRemotePhone(params)),
    getUserData: () => dispatch(getUser()),
    uploadImageData: params => dispatch(uploadImage(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfilePage);
