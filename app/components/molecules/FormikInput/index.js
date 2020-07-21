import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { warning as Warning } from 'Assets/svg-comp';
import BaseInput from 'components/atoms/BaseInput';

const getClasses = ({ active, disabled, value, invalid }) => {
  return {
    labelClasses: `Lh(0) Ff($ffmanrope) Pos(r) Pstart($md) W(fc) Pstart($md) H(0) Trsdu(0.8s) Trsp(a) Trstf(e) Cur(a) ${
      disabled ? 'C($disabledGrey2)' : ''
    } ${
      active && !disabled
        ? `${invalid ? 'C($error)' : 'C($primaryButton)'} T($mmd) Fz($fzlabel)`
        : value.length === 0
        ? 'T($xxl) Fz($fzbutton)'
        : 'T($mmd) Fz($fzlabel)'
    } ${
      value.length === 0
        ? 'C($inputGrey)'
        : active
        ? 'C($primaryButton)'
        : 'C($inputGrey)'
    }`,
    inputWrapperClasses: `Ff($ffmanrope) Bgc($navBarBg) ${
      disabled ? 'Bdb($bddisabledGrey2)' : 'Bgc($hoverInput):h'
    } ${
      invalid
        ? 'Bdb($bderrorColor)'
        : disabled
        ? ''
        : active
        ? 'Bdb($bdprimaryButton)'
        : 'Bdb($bdinputGrey)'
    } D(f) C($inputGrey) Bdrs($bdrsinput) Trsdu(0.8s) Trsp(a) Trstf(e)`,
    inputClasses: `Bd(n) Cur(a) W(100%) Pb($sm) Pt($smx) Pstart($md) Fz($fzbutton) C($inputGrey) C($inputGrey)::ph Op(1)::ph Bdrs($bdrsinput) Pos(r)::ph T(2px):ph Bg(i)`,
    warningClasses: `C($error) W($md) H($md) Pos(r) T($md) End($md) ${
      invalid ? 'Op(1)' : 'Op(0)'
    } Trsdu(0.8s) Trsp(a) Trstf(e)`,
    errorMessageClasses: `Ff($ffmanrope) C($error) Pstart($md) Fz($fzlabel) H($smd) ${
      invalid ? 'Op(1)' : 'Op(0)'
    } Trsdu(0.8s) Trsp(a) Trstf(e)`,
    warningContainerClass: 'D(f) Ai(c) Jc(c) W($md) H($md)',
  };
};

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
  } = props;
  const [active, setActive] = useState(false);
  const classes = getClasses({ active, disabled, value, invalid: error });
  const onBlurWrapper = e => {
    setActive(false);
    onBlur(e);
  };

  const onFocusWrapper = e => {
    if (e.target.autocomplete) {
      e.target.autocomplete = 'whatever';
    }
    setActive(true);
    onFocus(e);
  };

  const newRef = ref || useRef();

  const focusInput = () => newRef.current.focus();

  return (
    <div className={`${dimensionClasses} Ta(start)`}>
      <label htmlFor={id} className={classes.labelClasses} onClick={focusInput}>
        {label}
      </label>
      <div className={classes.inputWrapperClasses}>
        <input
          name={name}
          id={id}
          className={classes.inputClasses}
          type={type}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlurWrapper}
          onFocus={onFocusWrapper}
          value={value}
          disabled={disabled}
          ref={newRef}
          tabIndex={tabIndex}
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
};

FormikTextField.defaultProps = {
  type: 'text',
  autoComplete: 'off',
  onFocus: () => {},
  onBlur: () => {},
  disabled: false,
  label: '',
  dimensionClasses: 'W($25x)',
};

export default FormikTextField;
