/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import classNames from 'classnames';
import BaseButton from 'components/atoms/BaseButton';
import { classnames } from 'utils/helper';
import BaseIcon from 'components/atoms/BaseIcon';

const Tag = ({
  children,
  className,
  filter,
  title,
  disabled,
  onDelete,
  ...other
}) => {
  const [hover, setHover] = useState(false);

  const svgStyleJSON = {
    'Mstart($xxs)': true,
    'W($mmd)': true,
    'H($mmd)': true,
    'P($3xs)': true,
    'Bd(n)': true,
    'Va(bl)': true,
    'Cur(p)': true,
    'Bgc(t)': !hover,
    'Bgc(white)': hover,
    'C(black)': !disabled,
    'C($hoverInput)': disabled,
    'Bdrs($half)': true,
  };

  const wrapperStyleJSON = {
    'Miw($xxl)': true,
    'Maw($full)': true,
    'Px($sm)': true,
    'Py($xms)': true,
    'H(a)': true,
    'Bdrs($mmd)': true,
    'Ff($ffmanrope)': true,
    'Fz($smd)': true,
    'Bgc($navBarBg)': disabled || !filter,
    'Bgc($activeTagBlue)': !disabled && filter,
    'Whs(nw)': true,
    'O(n)': true,
    'Bd(n)': true,
    'Bd($bdprimaryButton):f': true,
    'C(black)': !disabled,
    'C($hoverInput)': disabled,
  };

  const onClickHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(e);
  };

  const FilterableTag = () => (
    <BaseButton
      className={classnames(wrapperStyleJSON)}
      disabled={disabled}
      {...other}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => !disabled && setHover(false)}
    >
      <div className="D(f) Ai(c) Jc(c)">
        <div className="Whs(nw)">
          {children !== null && children !== undefined ? children : 'Dummy Tag'}
        </div>
        <BaseIcon
          onClick={onClickHandler}
          icon="close"
          width="16px"
          height="16px"
          iconClasses={classnames(svgStyleJSON)}
        />
      </div>
    </BaseButton>
  );

  const NonFilterableTag = () => (
    <div className={classnames(wrapperStyleJSON)} {...other}>
      {children !== null && children !== undefined ? children : 'Dummy Tag'}
    </div>
  );

  return filter ? <FilterableTag /> : <NonFilterableTag />;
};

Tag.propTypes = {
  /**
   * Provide content to be rendered inside of a <Tag>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify if the <Tag> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Determine if <Tag> is a filter/chip
   */
  filter: PropTypes.bool,

  /**
   * Text to show on clear filters
   */
  title: PropTypes.string,
  /**
   * Function to execute on delete
   */
  onDelete: PropTypes.func,
};

export default Tag;
