import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import { PASSWORD_VALIDATION_OBJ } from './constants';

const ExistingPassword = ({
  next,
  back,
  forgot,
  wrapperClass,
  submitText,
  password,
  setPassword,
}) => {
  const [validate, setValidate] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const inputProps = {
    dataType: 'string',
    labelText: 'Password',
    tabIndex: 1,
    validationList: PASSWORD_VALIDATION_OBJ,
    name: 'password',
    type: 'password',
    onChange: e => {
      setPassword(e.target.value);
      if (validate) setValidate(false);
    },
    animate: true,
    setSubmittable,
    validate,
    value: password,
  };

  const forgotPasswordButton = {
    iconDescription: 'Forgot Password',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'fc',
    tabIndex: 3,
    onClick: forgot,
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValidate(true);
    if (submittable) next();
  };

  const signInButtonProps = {
    iconDescription: 'Sign In',
    alignContent: 'center',
    kind: 'primary',
    size: '10x',
    tabIndex: 2,
    onClick: handleSubmit,
  };
  return (
    <>
      <Input {...inputProps} />
      <div className="Mt($5x) D(f) Ai(c) Jc(sb)">
        <Button {...forgotPasswordButton}>
          <div>Forgot Password</div>
        </Button>
        <Button {...signInButtonProps}>
          <div>{submitText}</div>
        </Button>
      </div>
    </>
  );
};

ExistingPassword.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  width: PropTypes.string,
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  forgot: PropTypes.func.isRequired,
  password: PropTypes.string,
  setPassword: PropTypes.func,
};

ExistingPassword.defaultProps = {
  submitText: 'Sign In',
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer) Px($5xl) Pt($2xl) Pb($9xl) Mb($2xl)',
};

export default ExistingPassword;
