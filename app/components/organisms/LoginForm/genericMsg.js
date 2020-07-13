import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/molecules/Button';

const GenericMsg = ({
  wrapperClass,
  next,
  heading,
  subheading,
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
      <div className="W($30xl) Fz($fzmessage) Lh(28px)">{message}</div>
      <div className="Mt($xxl) D(f) Ai(c) Jc(c)">
        {next && (
          <Button {...signInButtonProps}>
            <div>{submitText}</div>
          </Button>
        )}
      </div>
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
