import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'components/organisms/LoginForm';

const LoginTemplate = ({
  text,
  loginStyle,
  textStyle,
  signInExisting,
  user,
  fetchExistingUser,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('BASE EMAIL ANDD PASS', email, password);

  const loginProps = {
    signInExisting,
    email,
    password,
    user,
    fetchExistingUser,
    setEmail,
    setPassword,
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
  fetchExistingUser: PropTypes.func,
  signInExisting: PropTypes.func,
  user: PropTypes.object,
};

LoginTemplate.defaultProps = {
  textStyle: 'Ff($ffmanrope) Fz(3.8vw) C(black) Mt($10x) Mb($3xxl)',
  text: 'Ready to Morff',
  loginStyle: 'Ta(c)',
};

export default LoginTemplate;
