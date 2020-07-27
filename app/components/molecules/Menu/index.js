import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { classnames } from 'utils/helper';
import BaseIcon from 'components/atoms/BaseIcon';
import Nav from '../../atoms/BaseNav';

const getMenuStyle = ({
  size,
  orientation,
  collapsible,
  alignContent,
  classes,
}) => {
  const commonStyles = {
    'O(n)': true,
    'W(100%)': true,
    'H(100%)': true,
  };

  const verticalStyle = {
    'D(f)': true,
    'Fxd(c)': true,
  };

  const horizontalStyle = {
    'D(f)': true,
    'Fxd(r)': true,
  };

  return `${classnames({
    ...commonStyles,
    ...(orientation === 'vertical' ? verticalStyle : {}),
    ...(orientation === 'horizontal' ? horizontalStyle : {}),
  })} ${classnames(classes)}`;
};

const Menu = React.forwardRef((props, ref) => {
  const {
    children,
    alignContent,
    onClick,
    onSelectionChange,
    size,
    collapsible,
    activeIndex,
    tabIndex,
    orientation,
    disabled,
    classes,
    ...others
  } = props;

  const [collapsed, setCollapsed] = useState(false);

  const [selectIndex, setSelectIndex] = useState(activeIndex);
  const getTabs = () => React.Children.map(children, tab => tab);

  const handleTabClick = onSelectionChange => (index, evt) => {
    selectTabAt(index, onSelectionChange);
  };

  const selectTabAt = (index, onSelectionChange) => {
    if (selectIndex !== index) {
      setSelectIndex(index);
      if (typeof onSelectionChange === 'function') {
        onSelectionChange(index);
      }
    }
  };

  const menuClasses = getMenuStyle({
    size,
    orientation,
    collapsible,
    alignContent,
    classes,
  });

  const newProps = {
    children,
    tabIndex,
    orientation,
    disabled,
    classes: menuClasses,
    ...others,
  };

  const setTabAt = (index, tabRef) => {
    this[`tab${index}`] = tabRef;
  };

  const tabsWithProps = getTabs().map((tab, index) => {
    const tabIndex = index === selectIndex ? 0 : -1;
    const newTab = React.cloneElement(tab, {
      index,
      orientation,
      selected: index === selectIndex,
      handleTabClick: handleTabClick(onSelectionChange),
      tabIndex,
      /* ref: (e) => {
          setTabAt(index, e);
        }, */
    });

    return newTab;
  });

  return (
    <Nav {...newProps} ref={ref}>
      {tabsWithProps}
    </Nav>
  );
});

Menu.propTypes = {
  alignContent: PropTypes.oneOf(['center', 'left', 'right']),
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  activeIndex: PropTypes.number,
  collapsible: PropTypes.bool,
  classes: PropTypes.string,
  size: PropTypes.string,
};

Menu.defaultProps = {
  disabled: false,
  orientation: 'vertical',
  activeIndex: 0,
  collapsible: false,
  onClick: () => {},
  alignContent: 'center',
  tabIndex: 1,
  size: 'auto',
};

export default Menu;
