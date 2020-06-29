import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EnterEmail from './email';
import ExistingPassword from './existingPassword';
import PasswordRecoveryMessage from './passwordRecoveryMsg';
import RecoverPasswordForm from './recoverPasswordForm';
import {
  EMAIL_VALIDATION_OBJ,
  EMAIL_LOGIN_FLOW,
  EMAIL_LOGIN_STATES,
} from './constants';
import { bulkValidation } from 'utils/helper';

const LoginForm = ({
  signInExisting,
  email,
  password,
  user,
  fetchExistingUser,
  setEmail,
  setPassword,
}) => {
  const [flow, setFlow] = useState(
    user && user.exists ? EMAIL_LOGIN_FLOW.EXISTING : EMAIL_LOGIN_FLOW.NEW_USER,
  );
  const [currentState, setCurrentState] = useState(
    user && user.exists ? flow[1] : flow[0],
  );

  useEffect(() => {
    if (user && user.exists) {
      setFlow(EMAIL_LOGIN_FLOW.EXISTING);
      setCurrentState(EMAIL_LOGIN_FLOW.EXISTING[1]);
    } else {
      setFlow(EMAIL_LOGIN_FLOW.NEW_USER);
      setCurrentState(EMAIL_LOGIN_FLOW.NEW_USER[1]);
    }
  }, [user]);

  switch (currentState) {
    case EMAIL_LOGIN_STATES.ENTER_EMAIL:
      return (
        <EnterEmail
          email={email}
          setEmail={setEmail}
          next={() => {
            fetchExistingUser({ email });
          }}
        />
      );
    case EMAIL_LOGIN_STATES.EXISTING_ENTER_PASSWORD:
      return (
        <ExistingPassword
          user={user}
          password={password}
          setPassword={setPassword}
          next={() => {
            signInExisting({ email, password });
          }}
          forgot={() => {
            setFlow(EMAIL_LOGIN_FLOW.FORGOT_PASSWORD);
            setCurrentState(flow[0]);
          }}
          back={() => {
            setFlow(EMAIL_LOGIN_FLOW.NEW_USER);
            setCurrentState(flow[0]);
          }}
        />
      );
    case EMAIL_LOGIN_STATES.FORGOT_PASSWORD_MESSAGE:
      return (
        <PasswordRecoveryMessage
          next={() => {
            setCurrentState(flow[1]);
          }}
          back={() => {
            setFlow(EMAIL_LOGIN_FLOW.EXISTING);
            setCurrentState(flow[1]);
          }}
        />
      );
    default:
      return (
        <EnterEmail
          email={email}
          setEmail={setEmail}
          next={() => {
            setEmail(email);
            fetchExistingUser({ email });
          }}
        />
      );
  }
};

LoginForm.propTypes = {
  signInExisting: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  user: PropTypes.object,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  fetchExistingUser: PropTypes.func,
};

LoginForm.defaultProps = {
  signInExisting: ({ email, password }) => {
    console.log('EMAIL AND PASSWORD', password, email);
    return { success: true };
  },
};

export default LoginForm;
