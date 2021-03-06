import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { warning as Warning } from 'Assets/svg-comp';
import { Field } from 'formik';
import { isEmpty } from 'lodash';
import BaseIcon from 'components/atoms/BaseIcon';

const getClasses = ({ active, disabled, value, invalid, joined }) => ({
  labelClasses: `Lh(0) Ff($ffmanrope) Pos(a) Z(1) Pstart($md) W($full) Pstart($md) Trsdu(0.3s) Trsp(a) Trstf(e) Cur(a) ${
    disabled ? 'C($disabledGrey2)' : ''
  } ${
    active && !disabled
      ? `${invalid ? 'C($error)' : 'C($primaryButton)'} T($sm) Fz($fzlabel)`
      : value.length === 0
      ? 'T($lmg) Fz($fzbutton)'
      : 'T($sm) Fz($fzlabel)'
  } ${
    value.length === 0
      ? 'C($inputGrey)'
      : active
      ? 'C($primaryButton)'
      : 'C($inputGrey)'
  }`,
  inputWrapperClasses: `Ff($ffmanrope) Bgc($navBarBg) H($2xl) ${
    joined
      ? disabled
        ? ''
        : 'Bgc($hoverInput):h'
      : disabled
      ? 'Bdb($bddisabledGrey2)'
      : 'Bgc($hoverInput):h'
  } ${
    joined
      ? ''
      : invalid
      ? 'Bdb($bderrorColor)'
      : disabled
      ? ''
      : active
      ? 'Bdb($bdprimaryButton)'
      : 'Bdb($bdinputGrey)'
  } D(f) C($inputGrey) Bdrs($bdrsinput) Trsdu(0.3s) Trsp(a) Trstf(e) Pos(r)`,
  inputClasses: `Bd(n) Cur(a) W($full) Pb($sm) Pt($smx) Pstart($md) Fz($fzbutton) C($inputGrey) C($inputGrey)::ph Bdrs($bdrsinput) Pos(r)::ph T(2px):ph Bg(i) ${
    active ? 'Op(1)::ph' : 'Op(0)::ph'
  } Trsdu(0.3s)::ph Trsp(a)::ph Trstf(e)::ph`,
  warningClasses: `C($error) W($md) H($md) Pos(r) T($md) End($md) ${
    invalid ? 'Op(1)' : 'Op(0)'
  } Trsdu(0.3s) Trsp(a) Trstf(e)`,
  errorMessageClasses: `Ff($ffmanrope) C($error) Pstart($md) Fz($fzlabel) H($smd) Pos(a) ${
    invalid ? 'Op(1)' : 'Op(0)'
  } Trsdu(0.3s) Trsp(a) Trstf(e)`,
  warningContainerClass: 'D(f) Ai(c) Jc(c) W($md) H($md) Pos(a) End(0)',
});

const FormikTextField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    type,
    autoComplete,
    id,
    onChange,
    onBlur,
    onFocus,
    value,
    disabled,
    error,
    tabIndex,
    dimensionClasses,
    placeholder,
    joined,
    prependIcon,
    iconWidth,
    iconHeight,
    iconClasses,
    iconSpacing,
    iconFill,
    ...others
  } = props;

  const [active, setActive] = useState(false);
  const onBlurWrapper = e => {
    setActive(false);
    onBlur(e);
  };

  const onFocusWrapper = e => {
    if (e.target.autocomplete) {
      e.target.autocomplete = 'off';
    }
    setActive(true);
    onFocus(e);
  };

  const classes = getClasses({
    active,
    disabled,
    value,
    invalid: error,
    joined,
  });

  const PrependIcon =
    !isEmpty(prependIcon) && !error ? (
      <BaseIcon
        icon={prependIcon}
        width={iconWidth}
        height="48px"
        iconClasses={iconClasses}
        fill={iconFill}
      />
    ) : null;

  return (
    <div className={`${dimensionClasses} Pos(r) Ta(start)`} key="firstName">
      <label htmlFor={id} className={classes.labelClasses} id={`${id}_label`}>
        {label}
      </label>
      <div className={classes.inputWrapperClasses}>
        <input
          value={value}
          name={name}
          id={id}
          className={classes.inputClasses}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlurWrapper}
          onFocus={onFocusWrapper}
          disabled={disabled}
          tabIndex={tabIndex}
          {...others}
        />
        <div className={classes.warningContainerClass}>
          {error && <Warning className={classes.warningClasses} />}
        </div>
        {PrependIcon ? (
          <div className={`Mend(${iconSpacing}) D(f) Ai(c) Jc(c) H($full)`}>
            {PrependIcon}
          </div>
        ) : null}
      </div>
      <div className={classes.errorMessageClasses}>{error || ''}</div>
    </div>
  );
});

FormikTextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  tabIndex: PropTypes.number,
  dimensionClasses: PropTypes.string,
  placeholder: PropTypes.string,
  joined: PropTypes.bool,
};

FormikTextField.defaultProps = {
  type: 'text',
  autoComplete: 'off',
  onFocus: () => {},
  onBlur: () => {},
  disabled: false,
  label: '',
  value: '',
  dimensionClasses: 'W($25x)',
  tabIndex: 0,
  joined: false,
  iconWidth: '16px',
  iconHeight: '16px',
  iconSpacing: '8px',
};

export default FormikTextField;
