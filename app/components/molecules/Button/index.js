import React from 'react';
import PropTypes from 'prop-types';
import { buttonReset } from 'utils/css';
import { classnames } from 'utils/helper';
import isObject from 'lodash/isObject';
import BaseButton from 'components/atoms/BaseButton';
import BaseIcon from 'components/atoms/BaseIcon';

const getButtonStyle = ({ size, kind, disabled, alignContent, classes }) => {
  const commonStyles = {
    'Ff($ffmanrope)': true,
    'Fw($fwregular)': true,
    'Fz($fzbutton)': true,
    'Py($md)': true,
    'H($2xl)': true,
    [`Miw($${size})`]: true,
    'Bdrs($bdrsbutton)': true,
    [`W($${size})`]: size && size.length > 0,
    'Jc(c) D(f) Ai(c)': !alignContent || alignContent === 'center',
    'Jc(s) D(f) Ai(c)': alignContent === 'start',
    'Jc(e) D(f) Ai(c)': alignContent === 'end',
  };

  const primaryButtonStyles = {
    'Bgc($hoverButton):h': !disabled,
    'Bgc($primaryButton)': !disabled,
    'Bgc($disabledGrey2)': disabled,
    'C(white)': true,
    'Px($md)': true,
    'Bd(n)': true,
    'Va(bl)': true,
    'Cur(p)': true,
  };

  const secondaryButtonStyles = {
    'Bd($bddisabledGreyButton)': !disabled,
    'C($primaryButton)': !disabled,
    'Bd($disabledGrey2)': disabled,
    'C($disabledGrey2)': disabled,
    'Bd($bdprimaryButton):h': !disabled,
    'Bgc(white)': true,
    'Px($md)': true,
    'Va(bl)': true,
    'Cur(p)': true,
  };

  const ghostStyles = {
    'Bgc($navBarBg):h': !disabled,
    'C($hoverButton)': !disabled,
    'Bgc(white)': true,
    'C($buttonGrey)': disabled,
    'Va(bl)': true,
    'Cur(p)': true,
    'Bd(n)': true,
    'Px($xs)': true,
  };

  return (
    classnames({
      ...commonStyles,
      ...(kind === 'primary' ? primaryButtonStyles : {}),
      ...(kind === 'secondary' ? secondaryButtonStyles : {}),
      ...(kind === 'ghost' || kind === 'tertiary' ? ghostStyles : {}),
    }) +
    ' ' +
    classnames(classes)
  );
};

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    iconDescription,
    alignContent,
    kind,
    onClick,
    renderIcon,
    iconWidth,
    iconHeight,
    iconClasses,
    iconSpacing,
    iconFill,
    size,
    tabIndex,
    disabled,
    to,
    classes,
  } = props;

  const buttonClasses = getButtonStyle({
    size,
    kind,
    disabled,
    alignContent,
    classes,
  });

  const newProps = {
    to,
    children,
    'aria-label': iconDescription,
    tabIndex,
    disabled,
    onClick,
    classes: buttonClasses,
  };

  const Icon = renderIcon ? (
    <BaseIcon
      icon={renderIcon}
      width={iconWidth}
      height={iconHeight}
      iconClasses={iconClasses}
      fill={iconFill}
    />
  ) : null;

  return (
    <BaseButton {...newProps} ref={ref}>
      {Icon ? <div className={`Mend(${iconSpacing}) D(f)`}>{Icon}</div> : null}
      {children}
    </BaseButton>
  );
});

Button.propTypes = {
  alignContent: PropTypes.oneOf(['center', 'left', 'right']),
  kind: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'ghost',
    'danger',
    'danger-primary',
  ]),
  iconDescription: PropTypes.string,
  onClick: PropTypes.func,
  renderIcon: PropTypes.string,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  classes: PropTypes.string,
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  iconSpacing: PropTypes.string,
  iconClasses: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  kind: 'primary',
  onClick: () => {},
  alignContent: 'center',
  tabIndex: 1,
  iconWidth: '16px',
  iconHeight: '16px',
  iconSpacing: '8px',
  iconClasses: 'Fill($primaryButton) W($md) H($md)',
};

export default Button;
