import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import GoogleLogin from 'components/molecules/GoogleLogin';
import BaseIcon from 'components/atoms/BaseIcon';
import { morff as Morff } from 'Assets/svg-comp';
import { EMAIL_VALIDATION_OBJ } from './constants';
import { bulkValidationList } from 'utils/helper';

const EnterEmail = ({
  submitText,
  wrapperClass,
  next,
  email,
  setEmail,
  ...props
}) => {
  const [invalid, setInvalid] = useState(false);
  const [invalidText, setInvalidText] = useState('');
  const isValid = data => {
    const validationObj = bulkValidationList({
      validationList: EMAIL_VALIDATION_OBJ,
      data,
    });
    console.log(validationObj, 'THIS IS WHERE');
    setInvalidText(validationObj.errorMsg);
    let v = !validationObj.valid;
    setInvalid(v);
    return v;
  };
  const inputProps = {
    dataType: 'string',
    labelText: 'Email address',
    tabIndex: 1,
    name: 'email',
    // autoFocus: true,
    // placeholder: 'Email address',
    type: 'email',
    onChange: e => {
      setEmail(e.target.value);
      if (invalid) setInvalid(false);
    },
    onFocus: () => {
      console.log('FOCUS');
    },
    onBlur: () => {
      console.log('BLUR');
    },
    animate: true,
    invalid,
    invalidText,
    value: email,
    disabled: false,
  };

  const buttonProps = {
    iconDescription: 'submit email',
    alignContent: 'center',
    kind: 'primary',
    size: '10x',
    tabIndex: 2,
  };

  const handleSubmit = e => {
    e.preventDefault();
    const flag = isValid(email);
    console.log('THIS IS EMAIL ', flag);
    if (!flag) next();
  };

  return (
    <div className={wrapperClass}>
      <div className="Px($2xl) Pt($2xl) Pb($9xl) Mb($2xl)">
        <BaseIcon icon="morff" iconClasses="W($3xxl)" {...props} />
        <div>
          <div className="C($headingDarkGrey) Fz($fzdesktopTitle) Mt($lg) Mb($xs)">
            Let's get Started
          </div>
          <div className="C($headingDarkGrey) Fz($fzbutton) Mb($lg)">
            Enter your email to continue to Morff
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <Input {...inputProps} />
          <div className="Mt($xxl) Mx(a) W($10x)">
            <Button {...buttonProps}>{submitText}</Button>
          </div>
        </form>
        <div className="My($2xl)">or</div>
        <div className="Mx(a) W(fc)">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

EnterEmail.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  width: PropTypes.string,
  next: PropTypes.func.isRequired,
};

EnterEmail.defaultProps = {
  submitText: 'Next',
  next: () => {},
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer)',
};

export default EnterEmail;
