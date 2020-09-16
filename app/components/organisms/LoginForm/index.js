import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from 'utils/helper';
import EnterEmail from './email';
import ExistingPassword from './existingPassword';
import GenericMessage from './genericMsg';
import ResetPasswordForm from './resetPassword';
import CongratulationsScreen from './congratulations';
import { EMAIL_LOGIN_STATES } from './constants';
import Header from './header';

const LoginForm = ({
  signInAllUsers,
  email,
  password,
  loginData,
  checkUser,
  setEmail,
  setPassword,
  confirmPassword,
  verificationCode,
  setConfirmPassword,
  verifyPassword,
  setCode,
  role,
  setUserChoice,
  resendVerificationCode,
  forgotPassword,
  signInWithGoogle,
}) => {
  const [switchState, setSwitchState] = useState(false);
  const [google, setGoogle] = useState(false);
  const token = localStorage.getItem('token');

  const [currentState, setCurrentState] = useState(
    token && (isEmpty(role) || role === 'undefined')
      ? EMAIL_LOGIN_STATES.CONGRATULATIONS
      : EMAIL_LOGIN_STATES.ENTER_EMAIL,
    // EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD,
  );

  console.log('LoginForm rendered');

  useEffect(() => {
    let newState;
    switch (currentState) {
      case EMAIL_LOGIN_STATES.ENTER_EMAIL:
        newState =
          loginData && loginData.id
            ? EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD
            : EMAIL_LOGIN_STATES.CREATE_ACCOUNT_MESSAGE;
        break;
      case EMAIL_LOGIN_STATES.CREATE_NEW_ACCOUNT:
        newState =
          loginData && loginData.token
            ? EMAIL_LOGIN_STATES.CONGRATULATIONS
            : undefined;
      case EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD:
        newState =
          loginData && loginData.email && !loginData.role
            ? EMAIL_LOGIN_STATES.CONGRATULATIONS
            : undefined;
      case EMAIL_LOGIN_STATES.RESET_PASSWORD:
        newState =
          loginData && loginData.email && !loginData.role
            ? EMAIL_LOGIN_STATES.CONGRATULATIONS
            : undefined;
      default:
        return;
    }
    console.log(newState, switchState, google, 'THIS IS IT');
    // debugger;
    if (newState && switchState && !google) {
      console.log(
        'SWITCH STATE TO from',
        currentState,
        'to ',
        newState,
        loginData && loginData.id,
      );
      // debugger;
      setCurrentState(newState);
      setSwitchState(false);
    }
  }, [loginData]);

  const getHeaderProps = current => {
    const LOOKUP = {
      [EMAIL_LOGIN_STATES.ENTER_EMAIL]: {
        heading: "Let's get Started",
        subheading: 'Enter your email to continue to Morff',
        topBannerStyle: 'D(f) Ai(c) Jc(c)',
      },
      [EMAIL_LOGIN_STATES.CREATE_ACCOUNT_MESSAGE]: {
        heading: 'Create Account',
        subheading: email,
        back: () => setCurrentState(EMAIL_LOGIN_STATES.ENTER_EMAIL),
      },
      [EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD]: {
        heading: 'Welcome Back',
        subheading: email,
        back: () => setCurrentState(EMAIL_LOGIN_STATES.ENTER_EMAIL),
      },
      [EMAIL_LOGIN_STATES.FORGOT_PASSWORD_MESSAGE]: {
        heading: 'Password Recovery',
        subheading: email,
        back: () => setCurrentState(EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD),
      },
      [EMAIL_LOGIN_STATES.RESET_PASSWORD]: {
        heading: 'Password Recovery',
        subheading:
          (loginData && (loginData.name || loginData.email)) || 'Dummy',
        back: () => {},
      },
      [EMAIL_LOGIN_STATES.CREATE_NEW_ACCOUNT]: {
        heading: 'Create Account',
        subheading: email,
        back: () => {
          setCurrentState(EMAIL_LOGIN_STATES.ENTER_EMAIL);
        },
      },
      [EMAIL_LOGIN_STATES.CONGRATULATIONS]: {
        heading: 'Congrats!',
        subheading: 'You have successfully created your account.',
      },
    };
    return LOOKUP[current];
  };

  const renderStates = () => {
    switch (currentState) {
      case EMAIL_LOGIN_STATES.ENTER_EMAIL:
        return (
          <EnterEmail
            email={email}
            setEmail={setEmail}
            next={() => {
              checkUser({ email });
              setSwitchState(true);
            }}
            checkUser={params => {
              setGoogle(true);
              checkUser(params);
              setSwitchState(true);
            }}
            signInGoogleApi={params => {
              signInWithGoogle(params);
            }}
          />
        );
      case EMAIL_LOGIN_STATES.CREATE_ACCOUNT_MESSAGE:
        return (
          <GenericMessage
            message="We sent a verification code on your email id. Please enter the code on the next screen to create your account."
            next={() => {
              setCurrentState(EMAIL_LOGIN_STATES.CREATE_NEW_ACCOUNT);
            }}
          />
        );
      case EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD:
        return (
          <ExistingPassword
            password={password}
            setPassword={setPassword}
            next={() => {
              signInAllUsers({ email, password });
              setSwitchState(true);
            }}
            forgot={() => {
              forgotPassword({ email });
              setCurrentState(EMAIL_LOGIN_STATES.FORGOT_PASSWORD_MESSAGE);
              setPassword('');
            }}
          />
        );
      case EMAIL_LOGIN_STATES.FORGOT_PASSWORD_MESSAGE:
        return (
          <GenericMessage
            next={() => {
              setCurrentState(EMAIL_LOGIN_STATES.RESET_PASSWORD);
            }}
            message="We sent a verification code on your registered email id. Please enter the code on the next screen to reset your password."
          />
        );
      case EMAIL_LOGIN_STATES.RESET_PASSWORD:
        return (
          <ResetPasswordForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            verificationCode={verificationCode}
            setConfirmPassword={setConfirmPassword}
            resend={() => resendVerificationCode({ email })}
            setCode={setCode}
            next={() => {
              verifyPassword({ email, password, verificationCode });
              setSwitchState(true);
            }}
          />
        );
      case EMAIL_LOGIN_STATES.CREATE_NEW_ACCOUNT:
        return (
          <ResetPasswordForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            verificationCode={verificationCode}
            setConfirmPassword={setConfirmPassword}
            resend={() => resendVerificationCode({ email })}
            setCode={setCode}
            submitText="Create Account"
            next={() => {
              console.log('THIS IS IT  1', email, password, verificationCode);
              signInAllUsers({ email, password, verificationCode });
              setSwitchState(true);
            }}
          />
        );
      case EMAIL_LOGIN_STATES.CONGRATULATIONS:
        return <CongratulationsScreen setUserChoice={setUserChoice} />;
      default:
        return (
          <EnterEmail
            email={email}
            setEmail={setEmail}
            next={() => {
              checkUser({ email });
              setSwitchState(true);
            }}
          />
        );
    }
  };
  const loggedIn = isLoggedIn();
  if (loggedIn) {
    return <Redirect to="/profile/details" />;
  }
  return (
    <div className="Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer) Pt($2xl) Pb($9xl) Mb($2xl) Mih($60xl)">
      <Header {...getHeaderProps(currentState)} />
      <div className="Px($5xl)">{renderStates()}</div>
    </div>
  );
};

LoginForm.propTypes = {
  signInAllUsers: PropTypes.func,
  email: PropTypes.string,
  loginData: PropTypes.object,
  setEmail: PropTypes.func,
  checkUser: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  confirmPassword: PropTypes.string,
  verificationCode: PropTypes.string,
  setConfirmPassword: PropTypes.func,
  setCode: PropTypes.func,
  verifyPassword: PropTypes.func,
  resendVerificationCode: PropTypes.func,
  role: PropTypes.string,
  setUserChoice: PropTypes.func,
  forgotPassword: PropTypes.func,
  signInWithGoogle: PropTypes.func,
};

LoginForm.defaultProps = {
  signInAllUsers: ({ email, password, code }) => ({ success: true }),
  verifyPassword: () => ({ success: true }),
};

export default LoginForm;
