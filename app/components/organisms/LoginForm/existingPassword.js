import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import BaseIcon from 'components/atoms/Baseicon';
import { bulkValidationList } from 'utils/helper';
import { PASSWORD_VALIDATION_OBJ } from './constants';
import { morff as Morff } from 'Assets/svg-comp';

const ExistingPassword = ({
  next,
  back,
  forgot,
  user,
  wrapperClass,
  submitText,
  password,
  setPassword,
  ...props
}) => {
  const [invalid, setInvalid] = useState(false);
  const [invalidText, setInvalidText] = useState('');
  const isValid = data => {
    const validationObj = bulkValidationList({
      validationList: PASSWORD_VALIDATION_OBJ,
      data,
    });
    console.log(validationObj);
    let v = !validationObj.valid;
    setInvalid(v);
    setInvalidText(validationObj.errorMsg);
    return v;
  };
  const inputProps = {
    dataType: 'string',
    labelText: 'Password',
    tabIndex: 1,
    name: 'password',
    // autoFocus: true,
    // placeholder: 'Email address',
    type: 'password',
    onChange: e => {
      if (invalid) setInvalid(false);
      setPassword(e.target.value);
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
    disabled: false,
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
    const flag = isValid(password);
    if (!flag) next();
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
    <div className={wrapperClass}>
      <div className="Px($2xl) Pt($2xl) Pb($9xl) Mb($2xl)">
        <div className="D(f) Ai(c) Jc(s)">
          <BaseIcon
            icon="arrowback"
            iconClasses="W($lg) Mend(35%)"
            onClick={back}
          />
          <BaseIcon icon="morff" iconClasses="W($3xxl)" {...props} />
        </div>
        <div>
          <div className="C($headingDarkGrey) Fz($fzdesktopTitle) Mt($lg) Mb($xs)">
            Welcome Back
          </div>
          <div className="C($headingDarkGrey) Fz($fzbutton) Mb($lg)">
            {user && user.name}
          </div>
        </div>
        <Input {...inputProps} />
        <div className="Mt($lg) D(f) Ai(c) Jc(sb)">
          <Button {...forgotPasswordButton}>
            <div>Forgot Password</div>
          </Button>
          <Button {...signInButtonProps}>
            <div>{submitText}</div>
          </Button>
        </div>
      </div>
    </div>
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
  next: () => {},
  back: () => {},
  forgot: () => {},
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer)',
};

export default ExistingPassword;
