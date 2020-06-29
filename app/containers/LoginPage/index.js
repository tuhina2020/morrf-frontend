import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import { useInjectReducer } from 'utils/injectReducer';
import LoginDesktopTemplate from 'templates/Login/desktop';
import history from 'utils/history';
import { makeSelectLoginPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getExistingUser, signInExisting } from './actions';

const LoginPage = ({
  signIn,
  responsiveData,
  fetchExistingUser,
  loginPage,
}) => {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga, mode: RESTART_ON_REMOUNT });
  const { login, user } = loginPage;
  if (login && login.token && user && user.exists) history.pushState('/next');
  else
    return (
      <LoginDesktopTemplate
        signInExisting={signIn}
        user={user}
        fetchExistingUser={fetchExistingUser}
      />
    );
};

LoginPage.propTypes = {
  responsiveData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchExistingUser: ({ email }) => {
      dispatch(getExistingUser({ email }));
    },
    signIn: ({ email, password }) => {
      dispatch(signInExisting({ email, password }));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
