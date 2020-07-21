import React from 'react';
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
import reducer from './reducer';
import saga from './saga';

const ProfilePage = ({ profilePage, match }) => {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga, mode: RESTART_ON_REMOUNT });
  const {
    params: { tabId },
  } = match;
  console.log(profilePage);
  if (tabId === 'details') return <ProfileDetails profile={profilePage} />;
  else return <div>LOL TTHIS IS EMPTY</div>;
};

ProfilePage.propTypes = {
  responsiveData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfilePage);
