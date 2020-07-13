import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BaseButton = React.forwardRef(({ to, ...props }, ref) => {
  if (to) {
    return (
      <NavLink ref={ref} {...props} to={to}>
        {props.children}
      </NavLink>
    );
  }
  return (
    <button ref={ref} {...props}>
      {props.children}
    </button>
  );
});

const Button = React.forwardRef((props, ref) => {
  const {
    iconDescription,
    onClick,
    tabIndex,
    disabled,
    to,
    classes,
    type,
    ...others
  } = props;

  const newProps = {
    to,
    'aria-label': iconDescription,
    tabIndex,
    disabled,
    onClick,
    type,
    className: classes,
    ...others,
  };

  return (
    <BaseButton {...newProps} ref={ref}>
      {props.children}
    </BaseButton>
  );
});

Button.propTypes = {
  iconDescription: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  tabIndex: 0,
  disabled: false,
  iconDescription: 'submit button',
  classes: '',
  type: 'submit',
};

export default Button;
