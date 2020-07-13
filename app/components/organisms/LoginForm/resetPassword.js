import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import BaseIcon from 'components/atoms/BaseIcon';
import { bulkValidationList } from 'utils/helper';
import { morff as Morff } from 'Assets/svg-comp';
import {
  PASSWORD_VALIDATION_OBJ,
  VERIFICATION_VALIDATION_OBJ,
} from './constants';

const ResetPassword = ({
  next,
  back,
  forgot,
  user,
  wrapperClass,
  submitText,
  password,
  setPassword,
  confirmPassword,
  verificationCode,
  setConfirmPassword,
  resend,
  setCode,
  heading,
  subheading,
  ...props
}) => {
  const [validate, setValidate] = useState([false, false, false]);
  const [submittable, setSubmittable] = useState([false, false, false]);

  const generateOnChange = ({ change, tabIndex }) => e => {
    if (validate[tabIndex]) {
      const newValidate = [...validate];
      newValidate[tabIndex] = false;
      setValidate(newValidate);
    }
    change(e.target.value);
  };

  const generateSubmitFunction = ({ tabIndex }) => val => {
    const newSubmittable = [...submittable];
    newSubmittable[tabIndex] = val;
    setSubmittable(newSubmittable);
  };

  const extraValidation = ({ value, name }) => ({
    valid: name === 'password' ? value === confirmPassword : value === password,
    invalidText: 'New Password doesnot match the password above',
  });

  const handleSubmit = e => {
    e.preventDefault();
    setValidate([true, true, true]);
    const canSubmit = submittable.reduce(
      (acc, current) => acc && current,
      true,
    );

    if (canSubmit && password === confirmPassword) next();
  };

  const signInButtonProps = {
    iconDescription: 'Sign In',
    alignContent: 'center',
    kind: 'primary',
    size: 'fc',
    tabIndex: 2,
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="Mb($lg)">
          <Input
            {...{
              value: password,
              validate: validate[0],
              tabIndex: 0,
              dataType: 'string',
              type: 'password',
              labelText: 'New password',
              name: 'password',
              validationList: PASSWORD_VALIDATION_OBJ,
              setSubmittable: generateSubmitFunction({ tabIndex: 0 }),
              onChange: generateOnChange({ change: setPassword, tabIndex: 0 }),
            }}
          />
        </div>
        <div className="Mb($lg)">
          <Input
            {...{
              value: confirmPassword,
              tabIndex: 1,
              labelText: 'Confirm new password',
              name: 'confirmPassword',
              dataType: 'string',
              type: 'password',
              validationList: PASSWORD_VALIDATION_OBJ,
              validate: validate[1],
              extraValidation,
              setSubmittable: generateSubmitFunction({ tabIndex: 1 }),
              onChange: generateOnChange({
                change: setConfirmPassword,
                tabIndex: 1,
              }),
            }}
          />
        </div>
        <div className="Mb($lg)">
          <Input
            {...{
              value: verificationCode,
              tabIndex: 2,
              labelText: 'Verification code',
              name: 'verificationCode',
              dataType: 'string',
              type: 'password',
              validationList: VERIFICATION_VALIDATION_OBJ,
              validate: validate[2],
              setSubmittable: generateSubmitFunction({ tabIndex: 2 }),
              onChange: generateOnChange({ change: setCode, tabIndex: 2 }),
            }}
          />
        </div>
        <div className="Mt($5x) Mx(a) W(fc)">
          <Button {...signInButtonProps}>
            <div>{submitText}</div>
          </Button>
        </div>
      </form>
      <div className="Fz($fzbutton) Ta(start) Mt($lg)">
        <div>Did not receive Verification Code ?</div>
        <div
          className="C($primaryButton) Mt($xs) Td(u):h"
          onClick={() => {
            console.log('YOYO CLICKER', typeof resend);
            resend();
          }}
        >
          Click here to resend
        </div>
      </div>
    </>
  );
};

ResetPassword.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  width: PropTypes.string,
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  forgot: PropTypes.func.isRequired,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  confirmPassword: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  verificationCode: PropTypes.string,
  setConfirmPassword: PropTypes.func,
  resend: PropTypes.func,
  setCode: PropTypes.func,
};

ResetPassword.defaultProps = {
  submitText: 'Reset Password',
  next: () => {},
  back: () => {},
  forgot: () => {},
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer) Px($5xl) Pt($2xl) Pb($9xl) Mb($2xl)',
};

export default ResetPassword;
