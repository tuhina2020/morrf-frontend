import React from 'react';
import PropTypes from 'prop-types';
import { classnames } from 'utils/helper';
import Nav from '../../atoms/BaseNav';

const getNavBarStyle = ({
  size,
  orientation,
  collapsible,
  collapsed,
  classes,
}) => {
  const commonStyles = {
    'Ff($ffmanrope)': true,
    'Fw($fwregular)': true,
    'Fz($fzmessage)': true,
    'Td(n)': true,
    'O(n)': true,
    'Va(b)': true,
    'Jc(sb) D(f) Ai(c)': true,
  };

  const verticalStyle = {
    'Bgc(white)': true,
    'C(black)': true,
    'Bxsh($bxshnavBar)': true,
    'Fxd(c)': true,
    'H(100vh)': true,
    'W($24xl)': !collapsed,
    'W($11xl)': collapsed,
  };

  const horizontalStyle = {
    'Bgc(white)': true,
    'C(black)': true,
    'Bxsh($bxshnavBar)': true,
    'Fxd(c)': true,
    'W(100vw)': true,
  };

  return `${classnames({
    ...commonStyles,
    ...(orientation === 'vertical' ? verticalStyle : {}),
    ...(orientation === 'horizontal' ? horizontalStyle : {}),
  })} ${classnames(classes)}`;
};

const NavBar = React.forwardRef((props, ref) => {
  const {
    children,
    size,
    iconDescription,
    collapsible,
    collapsed,
    tabIndex,
    orientation,
    disabled,
    classes,
    ...others
  } = props;

  const navBarClasses = getNavBarStyle({
    size,
    orientation,
    collapsible,
    collapsed,
    classes,
  });

  const newProps = {
    children,
    'aria-label': iconDescription,
    tabIndex,
    orientation,
    disabled,
    classes: navBarClasses,
    ...others,
  };

  const childrenOriented = children.map((child, index) => {
    const newChild = React.cloneElement(child, {
      orientation,
      key: index,
    });
    return newChild;
  });

  return (
    <Nav {...newProps} ref={ref}>
      {childrenOriented}
    </Nav>
  );
});

NavBar.propTypes = {
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  iconDescription: PropTypes.string,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  collapsible: PropTypes.bool,
  classes: PropTypes.string,
  collapsed: PropTypes.bool,
  size: PropTypes.string,
};

NavBar.defaultProps = {
  disabled: false,
  orientation: 'vertical',
  collapsed: false,
  iconDescription: 'NavBar',
  collapsible: false,
  tabIndex: 1,
  size: 'auto',
};

export default NavBar;
