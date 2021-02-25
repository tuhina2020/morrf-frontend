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
import { Redirect } from 'react-router-dom';
import { makeSelectLoginPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getExistingUser,
  signInAllUsers,
  forgotPassword,
  verifyNewPassword,
  resendCode,
  // setGlobalChoice,
  setToastData,
  googleLogin,
} from './actions';

const LoginPage = ({
  signIn,
  checkUser,
  verifyPassword,
  loginPage,
  // setUserChoice,
  forgotUserPassword,
  resendVerificationCode,
  dispatchToastData,
  signInWithGoogle,
}) => {
  if (isLoggedIn()) return <Redirect to="/tabs" />;
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga, mode: RESTART_ON_REMOUNT });
  const { error, login } = loginPage;
  if (error.message) {
    setToast(error);
    dispatchToastData({});
  }
  return (
    <LoginDesktopTemplate
      // setUserChoice={setUserChoice}
      signInAllUsers={signIn}
      loginData={login}
      checkUser={checkUser}
      error={error}
      forgotPassword={forgotUserPassword}
      verifyPassword={verifyPassword}
      resendVerificationCode={resendVerificationCode}
      signInWithGoogle={signInWithGoogle}
    />
  );
};

LoginPage.propTypes = {
  signIn: PropTypes.func,
  checkUser: PropTypes.func,
  verifyPassword: PropTypes.func,
  loginPage: PropTypes.func,
  // setUserChoice: PropTypes.func,
  forgotUserPassword: PropTypes.func,
  resendVerificationCode: PropTypes.func,
  dispatchToastData: PropTypes.func,
  signInWithGoogle: PropTypes.func,
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
    // setUserChoice: params => dispatch(setGlobalChoice(params)),
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
