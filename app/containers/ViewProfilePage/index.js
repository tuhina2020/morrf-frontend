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

import { makeSelectViewProfilePage } from './selectors';
import {
  setEmail,
  setLocalPhone,
  getUser,
  setPortfolioImages,
} from './actions';

import reducer from './reducer';

import saga from './saga';
import { isEmpty } from 'lodash';
import { queryByDisplayValue } from 'react-testing-library';

const ViewProfilePage = ({
  loggedIn,
  viewProfilePage,
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
  useInjectReducer({ key: 'viewProfilePage', reducer });

  useInjectSaga({ key: 'viewProfilePage', saga, mode: RESTART_ON_REMOUNT });

  const {
    params: { transientId },
  } = match;

  const { email, phone, id, loading, portfolioImages } = viewProfilePage;
  useEffect(() => {
    getUserData({ transientId });
  }, []);

  return (
    <ProfileDetails
      loading={loading}
      profile={{
        ...viewProfilePage,
        editPortfolio: viewProfilePage.portfolio,
        editExperience: viewProfilePage.experience,
      }}
      viewOnly={true}
      // verifyPhone={formVerifyPhone}
      // sendCode={savePhone}
      // uploadImageData={uploadImageData}
      // removePortfolio={removePortfolioData}
      // removeExperience={removeExperienceData}
      // logout={logoutAction}
      // removePortfolioImage={removePortfolioImg}
      // setPortfolioImages={setPortfolioImg}
      // portfolioImages={portfolioImages}
    />
  );
};

ViewProfilePage.propTypes = { responsiveData: PropTypes.object };

const mapStateToProps = createStructuredSelector({
  viewProfilePage: makeSelectViewProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserData: params => dispatch(getUser(params)),
    setPortfolioImg: params => dispatch(setPortfolioImages(params)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ViewProfilePage);
