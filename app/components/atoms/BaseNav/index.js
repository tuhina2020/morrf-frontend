import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BaseNav = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} {...props}>
    {props.children}
  </div>
));

const Nav = React.forwardRef((props, ref) => {
  const { iconDescription, classes, ...others } = props;

  const newProps = {
    'aria-label': iconDescription,
    className: classes,
    ...others,
  };

  return (
    <BaseNav {...newProps} ref={ref}>
      {props.children}
    </BaseNav>
  );
});

Nav.propTypes = {
  iconDescription: PropTypes.string,
  classes: PropTypes.string,
};

Nav.defaultProps = {
  iconDescription: 'Nav',
  classes: '',
};

export default Nav;
