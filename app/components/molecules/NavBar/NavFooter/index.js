import React from 'react';
import PropTypes from 'prop-types';
import { classnames } from 'utils/helper';
const getFooterClass = ({ width, height, border, orientation, classes }) => {
  const commonStyles = {
    [`Miw($${width})`]: true,
    [`W($${width})`]: true,
    [`Mih($${height})`]: true,
    [`H($${height})`]: true,
    'Bdt($bddarkGrey)': border,
  };

  return `${classnames({
    ...commonStyles,
  })} ${classnames(classes)}`;
};
const NavFooter = props => {
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

  const footerClasses = getFooterClass({
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
    className: footerClasses,
    ...others,
  };

  return <div {...newProps}>{children}</div>;
};

NavFooter.propTypes = {
  ariaLabel: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  classes: PropTypes.string,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  border: PropTypes.bool,
  children: PropTypes.node,
};

NavFooter.defaultProps = {
  ariaLabel: 'Nav Footer',
  width: 'full',
  height: 'full',
  orientation: 'vertical',
  border: true,
};

export default NavFooter;
