import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { warning as Warning } from 'Assets/svg-comp';

const InputContainer = React.forwardRef(
  (
    {
      labelText,
      name,
      placeholder,
      type,
      onClick,
      invalid,
      autoFocus,
      invalidText,
      disabled,
      autoComplete,
      labelClasses,
      inputContainerClass,
      inputWrapperClasses,
      inputClasses,
      warningClasses,
      errorMessageClasses,
      onChange,
      onFocus,
      onBlur,
      value,
      warningContainerClass,
      ...other
    },
    ref,
  ) => {
    const error = <div className={errorMessageClasses}>{invalidText}</div>;

    const newRef = ref || useRef();

    const inputProps = {
      onChange: evt => {
        if (!disabled) {
          onChange(evt);
        }
      },
      onClick: evt => {
        if (!disabled) {
          onClick(evt);
        }
      },
      onFocus: evt => {
        if (!disabled) {
          onFocus(evt);
        }
      },
      onBlur: evt => {
        if (!disabled) {
          onBlur(evt);
        }
      },
      placeholder,
      type,
      ref: newRef,
      name,
      autoComplete,
      className: inputClasses,
      title: placeholder,
      disabled,
      autoFocus,
      value,
      ...other,
    };

    const focusInput = () => newRef.current.focus();

    return (
      <div className={inputContainerClass}>
        <label htmlFor={name}>
          {labelText ? (
            <div className={labelClasses} onClick={focusInput} role="div">
              {labelText}
            </div>
          ) : null}
          <div className={inputWrapperClasses} data-invalid={invalid || null}>
            <input {...inputProps} />
            <div className={warningContainerClass}>
              {invalid && <Warning className={warningClasses} />}
            </div>
            {/* {isFluid && <hr className={`${prefix}--text-input__divider`} />} */}
            {/* <hr className={`${prefix}--text-input__divider`} /> */}
          </div>
        </label>
        {error}
      </div>
    );
  },
);

InputContainer.propTypes = {
  labelText: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  labelClasses: PropTypes.string,
  inputContainerClass: PropTypes.string,
  inputWrapperClasses: PropTypes.string,
  inputClasses: PropTypes.string,
  warningClasses: PropTypes.string,
  value: PropTypes.string,
  errorMessageClasses: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  warningContainerClass: PropTypes.string,
};

InputContainer.defaultProps = {
  labelText: 'label',
  placeholder: '',
  onClick: () => {},
  value: '',
  warningContainerClass: 'D(f) Ai(c) Jc(c) P($md)',
  autoFocus: false,
  invalid: false,
  invalidText: '',
  disabled: false,
  autoComplete: 'off',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

export default InputContainer;
