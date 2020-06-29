import React, { useState } from 'react';
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

    console.log('BASE INPUT ', value, invalid, invalidText);

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
      ref,
      name,
      autoComplete,
      className: inputClasses,
      title: placeholder,
      disabled,
      autoFocus,
      value,
      ...other,
    };

    return (
      <div className={inputContainerClass}>
        <label htmlFor={name}>
          {labelText ? <div className={labelClasses}>{labelText}</div> : null}
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
};

InputContainer.defaultProps = {
  labelText: 'label',
  placeholder: 'placeholder',
  onClick: () => {
    console.log('CLICKED');
  },
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
