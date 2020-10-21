import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/molecules/Button';

const GenericMsg = ({
  wrapperClass,
  next,
  line1,
  line2,
  message,
  submitText,
}) => {
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
    <>
      <div className="W($30xl) Fz($fzmessage) Lh(28px) Mx(a)">{message}</div>
      <div className="W($30xl) Fz($smd) Mx(a) Mb($xs)">{line1}</div>
      <div className="W($30xl) Fz($lg) Mx(a) Mb($xml)">{line2}</div>
      {next && (
        <div className="Mt($xxl) D(f) Ai(c) Jc(c)">
          <Button {...signInButtonProps}>
            <div>{submitText}</div>
          </Button>
        </div>
      )}
    </>
  );
};

GenericMsg.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  message: PropTypes.string.isRequired,
  next: PropTypes.func,
};

GenericMsg.defaultProps = {
  submitText: 'Next',
  heading: 'Password Recovery',
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer) P($xl) Pb($9xl) Mb($2xl)',
};

export default GenericMsg;
