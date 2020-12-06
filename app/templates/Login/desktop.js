import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'components/organisms/LoginForm';
import isEmpty from 'lodash/isEmpty';

const LoginTemplate = ({
  text,
  loginStyle,
  textStyle,
  signInAllUsers,
  verifyPassword,
  loginData,
  checkUser,
  role,
  error,
  setUserChoice,
  resendVerificationCode,
  forgotPassword,
  signInWithGoogle,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setCode] = useState('');

  useEffect(() => {
    if (!isEmpty(error)) {
      console.log('ERROR ', error);
      // setPassword('');
      // setConfirmPassword('');
      setCode('');
    }
  }, [error]);

  const loginProps = {
    signInAllUsers,
    verifyPassword,
    email,
    password,
    loginData,
    checkUser,
    setEmail,
    setPassword,
    confirmPassword,
    verificationCode,
    setConfirmPassword,
    setCode,
    setUserChoice,
    role,
    resendVerificationCode,
    forgotPassword,
    signInWithGoogle,
  };

  return (
    <div className={loginStyle}>
      <div className={textStyle}>{text}</div>
      <LoginForm {...loginProps} />
    </div>
  );
};

LoginTemplate.propTypes = {
  text: PropTypes.string,
  loginStyle: PropTypes.string,
  textStyle: PropTypes.string,
  checkUser: PropTypes.func,
  signInAllUsers: PropTypes.func,
  verifyPassword: PropTypes.func,
  setUserChoice: PropTypes.func,
  resendVerificationCode: PropTypes.func,
  signInWithGoogle: PropTypes.func,
  user: PropTypes.object,
};

LoginTemplate.defaultProps = {
  textStyle:
    'Ff($ffmanrope) Fz(3.8vw) C(black) Mb($3md) Bgc(white) W(fc) Mx(a) P($xss)',
  text: 'Ready to Morff ?',
  loginStyle: 'Ta(c) H(100vh) Pt($5x) login',
};

export default LoginTemplate;
