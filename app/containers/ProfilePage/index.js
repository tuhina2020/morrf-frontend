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
  getAllSkills,
  editPortfolio,
  editExperience,
  removePortfolio,
  removeExperience,
  logout,
  removePortfolioImage,
  setPortfolioImages,
} from './actions';

import reducer from './reducer';

import saga from './saga';
import { isEmpty } from 'lodash';
import { queryByDisplayValue } from 'react-testing-library';

const ProfilePage = ({
  loggedIn,
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
  getSkills,
  editPortfolioData,
  editExperienceData,
  removePortfolioData,
  removeExperienceData,
  logoutAction,
  removePortfolioImg,
  setPortfolioImg,
}) => {
  if (!isLoggedIn()) return <Redirect to="/login" />;
  useInjectReducer({ key: 'profilePage', reducer });

  useInjectSaga({ key: 'profilePage', saga, mode: RESTART_ON_REMOUNT });

  const {
    params: { tabId },
  } = match;

  const {
    skillsList,
    email,
    phone,
    id,
    loading,
    portfolioImages,
  } = profilePage;
  useEffect(() => {
    getUserData();
    getSkills();
  }, []);

  if (tabId === 'details')
    return (
      <ProfileDetails
        loading={loading}
        profile={{
          ...profilePage,
          contact: { phone, email },
          editPortfolio: profilePage.portfolio,
          editExperience: profilePage.experience,
        }}
        saveFunctionMap={{
          experience: saveExperience,
          about: saveAboutMe,
          personal: savePersonalDetails,
          portfolio: savePortfolio,
          editPortfolio: editPortfolioData,
          skills: saveSkills,
          contact: formVerifyPhone,
          editExperience: editExperienceData,
        }}
        verifyPhone={formVerifyPhone}
        sendCode={savePhone}
        uploadImageData={uploadImageData}
        removePortfolio={removePortfolioData}
        removeExperience={removeExperienceData}
        logout={logoutAction}
        removePortfolioImage={removePortfolioImg}
        setPortfolioImages={setPortfolioImg}
        portfolioImages={portfolioImages}
      />
    );

  return <div>LOL TTHIS IS EMPTY</div>;
};

ProfilePage.propTypes = { responsiveData: PropTypes.object };

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
    uploadImageData: params =>
      dispatch(uploadImage({ ...params, type: 'portfolio' })),
    getSkills: () => dispatch(getAllSkills()),
    editPortfolioData: params => dispatch(editPortfolio(params)),
    editExperienceData: params => dispatch(editExperience(params)),
    removePortfolioData: params => dispatch(removePortfolio(params)),
    removeExperienceData: params => dispatch(removeExperience(params)),
    logoutAction: () => dispatch(logout()),
    removePortfolioImg: params => dispatch(removePortfolioImage(params)),
    setPortfolioImg: params => dispatch(setPortfolioImages(params)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfilePage);
