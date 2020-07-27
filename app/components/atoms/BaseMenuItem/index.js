import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BaseMenuItem = React.forwardRef(({ to, ...props }, ref) => (
  <NavLink ref={ref} {...props} to={to}>
    {props.children}
  </NavLink>
));

const MenuItem = React.forwardRef((props, ref) => {
  const { iconDescription, tabIndex, to, classes, ...others } = props;

  const newProps = {
    to,
    'aria-label': iconDescription,
    tabIndex,
    className: classes,
    ...others,
  };

  return (
    <BaseMenuItem {...newProps} ref={ref}>
      {props.children}
    </BaseMenuItem>
  );
});

MenuItem.propTypes = {
  iconDescription: PropTypes.string,
  to: PropTypes.string,
  tabIndex: PropTypes.number,
  classes: PropTypes.string,
};

MenuItem.defaultProps = {
  tabIndex: 0,
  to: '#',
  iconDescription: 'item',
  classes: '',
};

export default MenuItem;
