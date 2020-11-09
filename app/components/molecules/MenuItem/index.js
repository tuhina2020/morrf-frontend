import React from 'react';
import PropTypes from 'prop-types';
import { classnames } from 'utils/helper';
import MenuItem from 'components/atoms/BaseMenuItem';
import BaseIcon from 'components/atoms/BaseIcon';

const getItemStyle = ({ size, orientation, selected, classes }) => {
  const commonStyles = {
    'Ff($ffmanrope)': true,
    'Fw($fwregular)': true,
    'Fz($fzmessage)': true,
    'Td(n)': true,
    'Py($md)': true,
    'H($4xl)': true,
    'O(n)': true,
    'Jc(c) D(f) Ai(c)': true,
    'Cur(p)': true,
  };

  const verticalStyle = {
    'Bgc(#f5f5f5):h': true, // TODO: Set hover color
    'Bgc(white)': true,
    'C(black)': true,
    'Miw($auto)': true,
    'W($full)': true,
    'Px($md)': true,
    'Bd(n)': true,
    'Va(m)': true,
  };

  const verticalActiveStyle = {
    'Bgc(#f5f5f5):h': true, // TODO: Set hover color
    'Bgc(#f5f5f5)': true,
    'C($primary)': true,
    'Miw($auto)': true,
    'W($full)': true,
    'Px($md)': true,
    'Va(m)': true,
    'Bdstart($bdprimaryButton)': true,
    'Bdt($bddarkGrey)': true,
  };

  const horizontalActiveStyle = {
    'Bgc(#fafafa):h': true, // TODO: Set hover color
    'Bgc(#fafafa)': true,
    'C($primary)': true,
    'Miw($4xl)': true,
    'W($4xl)': true,
    'Px($md)': true,
    'Va(m)': true,
    'Bdb($bdprimaryButton)': true,
    'Bdend($bddarkGrey)': true,
  };

  const horizontalStyle = {
    'Bgc(#f5f5f5):h': true, // TODO: Set hover color
    'Bgc(white)': true,
    'C(black)': true,
    'Miw($4xl)': true,
    'W($4xl)': true,
    'Bgc(white)': true,
    'Bd(n)': true,

    'Va(bl)': true,
  };

  return `${classnames({
    ...commonStyles,
    ...(orientation === 'vertical' && selected ? verticalActiveStyle : {}),
    ...(orientation === 'vertical' && !selected ? verticalStyle : {}),
    ...(orientation === 'horizontal' && selected ? horizontalActiveStyle : {}),
    ...(orientation === 'horizontal' && !selected ? horizontalStyle : {}),
  })} ${classnames(classes)}`;
};

const Item = React.forwardRef((props, ref) => {
  const {
    children,
    iconDescription,
    onClick,
    handleTabClick,
    orientation,
    prependIcon,
    iconWidth,
    index,
    iconHeight,
    iconClasses,
    iconSpacing,
    iconFill,
    disabled,
    submenu,
    collapsed,
    size,
    tabIndex,
    selected,
    to,
    classes,
    ...others
  } = props;

  const itemClasses = getItemStyle({
    size,
    orientation,
    selected,
    classes,
  });

  const newProps = {
    to,
    children,
    'aria-label': iconDescription,
    tabIndex,
    classes: itemClasses,
    ...others,
  };

  const Icon = prependIcon ? (
    <BaseIcon
      icon={prependIcon}
      width={iconWidth}
      height={iconHeight}
      iconClasses={iconClasses}
      fill={iconFill}
    />
  ) : null;

  return (
    <MenuItem
      onClick={e => {
        if (disabled) {
          return;
        }
        handleTabClick(index, e);
        onClick(e);
      }}
      {...newProps}
      ref={ref}
    >
      {Icon ? <div className={`Mend(${iconSpacing}) D(f)`}>{Icon}</div> : null}
      {children}
    </MenuItem>
  );
});

Item.propTypes = {
  disabled: PropTypes.bool,
  submenu: PropTypes.node,
  index: PropTypes.number,
  collapsed: PropTypes.bool,
  iconDescription: PropTypes.string,
  onClick: PropTypes.func,
  prependIcon: PropTypes.string,
  tabIndex: PropTypes.number,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  selected: PropTypes.bool,
  to: PropTypes.string,
  classes: PropTypes.string,
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  iconSpacing: PropTypes.string,
  iconClasses: PropTypes.string,
  size: PropTypes.string,
  iconFill: PropTypes.string,
};

Item.defaultProps = {
  selected: false,
  onClick: () => {},
  orientation: 'vertical',
  index: 0,
  tabIndex: 1,
  iconWidth: '16px',
  iconHeight: '16px',
  iconSpacing: '8px',
  size: 'auto',
  iconClasses: 'Fill($primaryButton) W($md) H($md)',
  disabled: false,
  submenu: null,
  collapsed: false,
  to: '#',
};

export default Item;
