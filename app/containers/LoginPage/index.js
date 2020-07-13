import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import { setToast, isLoggedIn } from 'utils/helper';
import { useInjectReducer } from 'utils/injectReducer';
import LoginDesktopTemplate from 'templates/Login/desktop';
// import history from 'utils/history';
import { makeSelectLoginPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
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
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga, mode: RESTART_ON_REMOUNT });
  const { error, role, login } = loginPage;
  if (error.message) {
    setToast(error);
    dispatchToastData({});
  }
  const loggedIn = isLoggedIn();
  console.log('ALREADY LOGGED IN ', loggedIn);
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
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
