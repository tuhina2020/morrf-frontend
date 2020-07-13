import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import GoogleLogin from 'components/molecules/GoogleLogin';
import { EMAIL_VALIDATION_OBJ } from './constants';

const EnterEmail = ({
  submitText,
  wrapperClass,
  next,
  email,
  setEmail,
  signInGoogleApi,
}) => {
  const [validate, setValidate] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const inputProps = {
    dataType: 'string',
    labelText: 'Email address',
    validationList: EMAIL_VALIDATION_OBJ,
    tabIndex: 1,
    name: 'email',
    type: 'email',
    onChange: e => {
      setEmail(e.target.value);
      if (validate) setValidate(false);
    },
    setSubmittable,
    animate: true,
    value: email,
    validate,
  };

  const buttonProps = {
    iconDescription: 'Submit Email',
    alignContent: 'center',
    kind: 'primary',
    size: '10x',
    tabIndex: 2,
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValidate(true);
    if (submittable) next();
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Input {...inputProps} />
        <div className="Mt($5x) Mx(a) W($10x)">
          <Button {...buttonProps}>{submitText}</Button>
        </div>
      </form>

      <div className="My($2xl) D(f) Ai(c) Jc(c)">
        <div className="H(1px) W($half) Bgc($hoverInput)" />
        <div className="W(40px)">or</div>
        <div className="H(1px) W($half) Bgc($hoverInput)" />
      </div>
      <div className="Mx(a) W(fc)">
        <GoogleLogin signInApi={signInGoogleApi} />
      </div>
    </>
  );
};

EnterEmail.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  width: PropTypes.string,
  next: PropTypes.func.isRequired,
  signInGoogleApi: PropTypes.func,
  setEmail: PropTypes.func,
};

EnterEmail.defaultProps = {
  submitText: 'Next',
  signInGoogleApi: () => {},
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer) Px($5xl) Pt($2xl) Pb($9xl) Mb($2xl)',
};

export default EnterEmail;
