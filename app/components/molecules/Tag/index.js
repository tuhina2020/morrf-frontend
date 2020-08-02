/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
// import classNames from 'classnames';
import { classnames } from 'utils/helper';
import BaseIcon from 'components/atoms/BaseIcon';

const TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
  clickable: 'clickable',
  nonClickable: 'nonClickable',
};

const prefix = 'lol';

const Tag = ({
  children,
  className,
  type,
  filter,
  title,
  disabled,
  onDelete,
  ...other
}) => {
  // const tagClass = `${prefix}--tag--${type}`;
  // const tagClasses = classnames(`${prefix}--tag`, tagClass, className, {
  //   [`${prefix}--tag--disabled`]: disabled,
  //   [`${prefix}--tag--filter`]: filter,
  // });

  const svgStyleJSON = {
    'Mstart($xxs)': true,
    'W($mmd)': true,
    'H($mmd)': true,
    'P($3xs)': true,
    'Bd(n)': true,
    'Va(bl)': true,
    'Cur(p)': true,
    'Bgc(white):h': true,
    'Bgc(t)': true,
    'C(black)': true,
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
    'Bgc($navBarBg)': disabled,
    'Bgc($activeTagBlue)': !disabled,
    'Whs(nw)': true,
  };

  return filter && !disabled ? (
    <div
      className={classnames(wrapperStyleJSON)}
      disabled={disabled}
      {...other}
    >
      <div className="D(f) Ai(c) Jc(c)">
        <div className="Whs(nw)">
          {children !== null && children !== undefined ? children : 'Dummy Tag'}
        </div>
        <BaseIcon
          onClick={onDelete}
          icon="close"
          width="16px"
          height="16px"
          iconClasses={classnames(svgStyleJSON)}
          fill="#000"
        />
      </div>
    </div>
  ) : (
    <div className={classnames(wrapperStyleJSON)} {...other}>
      {children !== null && children !== undefined ? children : 'Dummy Tag'}
    </div>
  );
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

export const types = Object.keys(TYPES);
export default Tag;
