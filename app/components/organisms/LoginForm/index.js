import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from 'utils/helper';
import EnterEmail from './email';
import ExistingPassword from './existingPassword';
import GenericMessage from './genericMsg';
import ResetPasswordForm from './resetPassword';
// import CongratulationsScreen from './congratulations';
import { EMAIL_LOGIN_STATES } from './constants';
import Header from './header';
import LoadingAnimation from 'Assets/gifs/loading.gif';

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
  // role,
  setUserChoice,
  resendVerificationCode,
  forgotPassword,
  signInWithGoogle,
}) => {
  // if (isLoggedIn()) return <Redirect to="/profile/details" />;
  const [switchState, setSwitchState] = useState(false);
  const [google, setGoogle] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const [currentState, setCurrentState] = useState(
    token ? EMAIL_LOGIN_STATES.CONGRATULATIONS : EMAIL_LOGIN_STATES.ENTER_EMAIL,
    // EMAIL_LOGIN_STATES.CREATE_NEW_ACCOUNT,
  );

  useEffect(() => {
    setLoading(false);
  }, [loginData]);

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
          loginData && loginData.status === 'ACTIVE'
            ? EMAIL_LOGIN_STATES.CONGRATULATIONS
            : isLoggedIn() && EMAIL_LOGIN_STATES.SUCCESS;
        break;
      case EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD:
        newState =
          loginData && loginData.status === 'ACTIVE'
            ? EMAIL_LOGIN_STATES.CONGRATULATIONS
            : isLoggedIn() && EMAIL_LOGIN_STATES.SUCCESS;
        break;
      case EMAIL_LOGIN_STATES.RESET_PASSWORD:
        newState =
          loginData && loginData.email
            ? EMAIL_LOGIN_STATES.CONGRATULATIONS
            : undefined;
        break;
      case EMAIL_LOGIN_STATES.CONGRATULATIONS:
        newState =
          loginData && loginData.id
            ? EMAIL_LOGIN_STATES.SUCCESS
            : EMAIL_LOGIN_STATES.CONGRATULATIONS;
      default:
        return;
    }
    // if (isLoggedIn() && newState !== EMAIL_LOGIN_STATES.CONGRATULATIONS) {
    //   newState = EMAIL_LOGIN_STATES.SUCCESS;
    //   setSwitchState(true);
    // }

    if (newState && switchState && !google) {
      setCurrentState(newState);
      setLoading(false);
      setSwitchState(false);
    }
  }, [loginData, isLoggedIn()]);

  const getHeaderProps = () => {
    const LOOKUP = {
      [EMAIL_LOGIN_STATES.ENTER_EMAIL]: {
        heading: "Let's get Started",
        subheading: 'Sign In or Sign Up with your email',
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
        back: () => {
          setCurrentState(EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD);
        },
      },
      [EMAIL_LOGIN_STATES.RESET_PASSWORD]: {
        heading: 'Password Recovery',
        subheading:
          (loginData && (loginData.name || loginData.email)) || 'Dummy',
        back: () => {
          setCurrentState(EMAIL_LOGIN_STATES.ENTER_EMAIL);
        },
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
    return LOOKUP[currentState];
  };

  const renderStates = () => {
    switch (currentState) {
      case EMAIL_LOGIN_STATES.ENTER_EMAIL:
        return (
          <EnterEmail
            email={email}
            setEmail={setEmail}
            next={email => {
              setLoading(true);
              setEmail(email);
              checkUser({ email, mode: 'normal' });
              setSwitchState(true);
            }}
            checkUser={params => {
              setGoogle(true);
              checkUser({ ...params, mode: 'google' });
              setSwitchState(true);
            }}
            signInGoogleApi={signInWithGoogle}
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
            next={password => {
              setLoading(true);
              setPassword(password);
              signInAllUsers({ email, password, mode: 'existing-user' });
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
            resend={() => resendVerificationCode({ email })}
            setCode={setCode}
            next={values => {
              setLoading(true);
              console.log(values);
              verifyPassword({
                email,
                password: values.password,
                verificationCode: values.verificationCode,
              });
              setSwitchState(true);
            }}
            label="New password"
            confirmLabel="Confirm new password"
          />
        );
      case EMAIL_LOGIN_STATES.CREATE_NEW_ACCOUNT:
        return (
          <ResetPasswordForm
            resend={() => resendVerificationCode({ email })}
            submitText="Create Account"
            label="Create password"
            confirmLabel="Confirm password"
            next={values => {
              setLoading(true);
              console.log(values);
              signInAllUsers({
                email,
                password: values.password,
                verificationCode: values.verificationCode,
                mode: 'new-user',
              });
              setSwitchState(true);
            }}
          />
        );
      case EMAIL_LOGIN_STATES.CONGRATULATIONS:
      case EMAIL_LOGIN_STATES.SUCCESS:
        return <Redirect to="/tabs" />;
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

  return (
    <div className="Pos(r) Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W($45x) Py($2xl) Bdrs($bdrscontainer) Mb($2xl)">
      <div className={loading ? 'Op(0.5)' : undefined}>
        <Header {...getHeaderProps()} />
      </div>
      {loading && (
        <img
          src={LoadingAnimation}
          className="W($full) Pos(a) T($10x) Start(0)"
        />
      )}
      <div className={`Px($5xl) ${loading ? 'Op(0.2)' : 'Op(1)'}`}>
        {renderStates()}
      </div>
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
  // role: PropTypes.string,
  setUserChoice: PropTypes.func,
  forgotPassword: PropTypes.func,
  signInWithGoogle: PropTypes.func,
};

LoginForm.defaultProps = {
  signInAllUsers: ({ email, password, code }) => ({ success: true }),
  verifyPassword: () => ({ success: true }),
};

export default LoginForm;
