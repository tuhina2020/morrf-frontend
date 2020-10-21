import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import { setToast, isLoggedIn } from 'utils/helper';
import LoginDesktopTemplate from 'templates/Login/desktop';
import { makeSelectLoginPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Redirect } from 'react-router-dom';
import {
  getExistingUser,
  signInAllUsers,
  forgotPassword,
  verifyNewPassword,
  resendCode,
  setGlobalChoice,
  setToastData,
  googleLogin,
} from './actions';

const LoginPage = ({
  loggedIn,
  signIn,
  responsiveData,
  checkUser,
  verifyPassword,
  loginPage,
  setUserChoice,
  history,
  forgotUserPassword,
  resendVerificationCode,
  dispatchToastData,
  signInWithGoogle,
}) => {
  if (isLoggedIn()) return <Redirect to="/profile/details" />;
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga, mode: RESTART_ON_REMOUNT });
  const { error, role, login } = loginPage;
  if (error.message) {
    setToast(error);
    dispatchToastData({});
  }
  return (
    <LoginDesktopTemplate
      setUserChoice={setUserChoice}
      signInAllUsers={signIn}
      loginData={login}
      checkUser={checkUser}
      role={role}
      error={error}
      forgotPassword={forgotUserPassword}
      verifyPassword={verifyPassword}
      resendVerificationCode={resendVerificationCode}
      signInWithGoogle={signInWithGoogle}
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
    checkUser: params => dispatch(getExistingUser(params)),
    signIn: params => dispatch(signInAllUsers(params)),
    verifyPassword: params => dispatch(verifyNewPassword(params)),
    forgotUserPassword: params => dispatch(forgotPassword(params)),
    setUserChoice: params => dispatch(setGlobalChoice(params)),
    resendVerificationCode: params => dispatch(resendCode(params)),
    dispatchToastData: params => dispatch(setToastData(params)),
    signInWithGoogle: params => dispatch(googleLogin(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
