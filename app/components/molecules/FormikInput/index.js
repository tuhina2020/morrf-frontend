import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { warning as Warning } from 'Assets/svg-comp';
import { Field } from 'formik';

const getClasses = ({ active, disabled, value, invalid, joined }) => ({
  labelClasses: `Lh(0) Ff($ffmanrope) Pos(a) Pstart($md) W(fc) Pstart($md) Trsdu(0.3s) Trsp(a) Trstf(e) Cur(a) ${
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
  } D(f) C($inputGrey) Bdrs($bdrsinput) Trsdu(0.3s) Trsp(a) Trstf(e)`,
  inputClasses: `Bd(n) Cur(a) W(100%) Pb($sm) Pt($smx) Pstart($md) Fz($fzbutton) C($inputGrey) C($inputGrey)::ph Bdrs($bdrsinput) Pos(r)::ph T(2px):ph Bg(i) ${
    active ? 'Op(1)::ph' : 'Op(0)::ph'
  } Trsdu(0.6s)::ph Trsp(a)::ph Trstf(e)::ph`,
  warningClasses: `C($error) W($md) H($md) Pos(r) T($md) End($md) ${
    invalid ? 'Op(1)' : 'Op(0)'
  } Trsdu(0.3s) Trsp(a) Trstf(e)`,
  errorMessageClasses: `Ff($ffmanrope) C($error) Pstart($md) Fz($fzlabel) H($smd) Pos(a) ${
    invalid ? 'Op(1)' : 'Op(0)'
  } Trsdu(0.3s) Trsp(a) Trstf(e)`,
  warningContainerClass: 'D(f) Ai(c) Jc(c) W($md) H($md)',
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
};

export default FormikTextField;
