import React from 'react';
import PropTypes from 'prop-types';
import { classnames } from 'utils/helper';
const getHeaderClass = ({ width, height, border, orientation, classes }) => {
  const commonStyles = {
    [`Miw($${width})`]: true,
    [`W($${width})`]: true,
    [`Mih($${height})`]: true,
    [`H($${height})`]: true,
    'Bdb($bddarkGrey)': border,
  };

  return `${classnames({
    ...commonStyles,
  })} ${classnames(classes)}`;
};
const NavHeader = props => {
  const {
    ariaLabel,
    tabIndex,
    width,
    height,
    classes,
    orientation,
    border,
    children,
    ...others
  } = props;

  const headerClasses = getHeaderClass({
    width,
    height,
    border,
    orientation,
    classes,
  });

  const newProps = {
    children,
    'aria-label': ariaLabel,
    tabIndex,
    className: headerClasses,
    ...others,
  };

  return <div {...newProps}>{children}</div>;
};

NavHeader.propTypes = {
  ariaLabel: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  classes: PropTypes.string,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  border: PropTypes.bool,
  children: PropTypes.node,
};

NavHeader.defaultProps = {
  ariaLabel: 'Nav Header',
  width: 'full',
  height: 'full',
  orientation: 'vertical',
  border: true,
};

export default NavHeader;
