import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import BaseIcon from 'components/atoms/Baseicon';
import { morff as Morff } from 'Assets/svg-comp';

const PasswordRecoveryMsg = ({ next, back, heading, ...props }) => {
  const handleSubmit = e => {
    e.preventDefault();
    next();
  };

  const signInButtonProps = {
    iconDescription: 'recover password',
    alignContent: 'center',
    kind: 'primary',
    size: '10x',
    tabIndex: 1,
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
            {heading}
          </div>
          <div className="C($headingDarkGrey) Fz($fzbutton) Mb($lg)">
            {user && user.name}
          </div>
        </div>
        <div>
          We sent a verification code on your registered email id. Please enter
          the code on the next screen to reset your password.
        </div>
        <div className="Mt($lg) D(f) Ai(c) Jc(c)">
          <Button {...signInButtonProps}>
            <div>{submitText}</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

PasswordRecoveryMsg.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  heading: PropTypes.string,
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

PasswordRecoveryMsg.defaultProps = {
  submitText: 'Next',
  heading: 'Password Recovery',
  next: () => {},
  back: () => {},
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer)',
};

export default PasswordRecoveryMsg;
