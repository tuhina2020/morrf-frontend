import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import omit from 'lodash/omit';

const BaseButton = React.forwardRef(({ children, to, ...props }, ref) => {
  if (to) {
    return (
      <NavLink ref={ref} {...props} to={to}>
        {children}
      </NavLink>
    );
  } else {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
});

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    iconDescription,
    onClick,
    tabIndex,
    disabled,
    to,
    classes,
  } = props;

  const newProps = {
    to,
    children,
    'aria-label': iconDescription,
    tabIndex,
    disabled,
    onClick,
    className: classes,
  };

  return (
    <BaseButton {...newProps} ref={ref}>
      {children}
    </BaseButton>
  );
});

Button.propTypes = {
  iconDescription: PropTypes.string,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  classes: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  tabIndex: 0,
  disabled: false,
  iconDescription: 'submit button',
  classes: '',
};

export default Button;
