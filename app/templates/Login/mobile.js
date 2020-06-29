import React from 'react';
import LoginForm from 'components/molecules/LoginForm';

const LoginTemplate = ({ text, loginStyle }) => {
  return (
    <div className={loginStyle}>
      <LoginForm />
    </div>
  );
};

export default LoginTemplate;
