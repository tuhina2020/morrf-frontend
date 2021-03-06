import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bulkValidationList } from 'utils/helper';
import BaseInput from 'components/atoms/BaseInput';

const getClasses = ({ active, disabled, value, invalid, animate }) => ({
  labelClasses: `Ff($ffmanrope) Pos(r) Pstart($md) W(fc) Pstart($md) H($smd) Trsdu(0.3s) Trsp(a) Trstf(e) Cur(a) ${
    disabled ? 'C($disabledGrey2)' : ''
  } ${
    active && !disabled
      ? `${invalid ? 'C($error)' : 'C($primaryButton)'} T($md) Fz($fzlabel)`
      : value.length === 0
      ? 'T($xl) Fz($fzbutton)'
      : 'T($md) Fz($fzlabel)'
  } ${
    value.length === 0
      ? 'C($inputGrey)'
      : active
      ? 'C($primaryButton)'
      : 'C($inputGrey)'
  }`,
  inputWrapperClasses: `Ff($ffmanrope) ${
    invalid
      ? 'Bdb($bderrorColor)'
      : active
      ? 'Bdb($bdprimaryButton)'
      : 'Bdb($bdinputGrey)'
  } D(f) C($inputGrey)::ph Bgc($navBarBg) Bdrs($bdrsinput) ${
    disabled ? '' : 'Bgc($hoverInput):h'
  } Trsdu(0.3s) Trsp(a) Trstf(e)`,
  inputClasses: `Bd(n) Cur(a) W($full) Pb($sm) Pt($smx) Pstart($md) Fz($fzbutton) C($inputGrey) C($inputGrey)::ph Op(1)::ph Bdrs($bdrsinput) Pos(r)::ph T(2px):ph Bg(i) lhcrop`,
  warningClasses: `C($error) W($md) H($md) ${
    invalid ? 'Op(1)' : 'Op(0)'
  } Trsdu(0.3s) Trsp(a) Trstf(e)`,
  errorMessageClasses: `C($error) Pstart($md) Fz($fzlabel) H($smd) Pos(a) ${
    invalid ? 'Op(1)' : 'Op(0)'
  } Trsdu(0.3s) Trsp(a) Trstf(e)`,
});

const Input = React.forwardRef(
  (
    {
      dataType,
      labelText,
      autoFocus,
      name,
      placeholder,
      type,
      onChange,
      onFocus,
      onBlur,
      animate,
      tabIndex,
      disabled,
      value,
      validationList,
      validate,
      size,
      setSubmittable,
      extraValidation,
      dimensionClasses,
      ...other
    },
    ref,
  ) => {
    const [active, setActive] = useState(value.length > 0);
    const [invalid, setInvalid] = useState(false);
    const [invalidText, setInvalidText] = useState('');

    const validationCheck = ({ current }) => {
      const validationObj = bulkValidationList({
        validationList,
        data: current || value,
      });
      const extraDetails = extraValidation({ value: current || value, name });
      if (!current) {
        setInvalidText(
          validationObj.valid
            ? extraDetails.valid
              ? ''
              : extraDetails.invalidText
            : validationObj.errorMsg,
        );
        setInvalid(!validationObj.valid || !extraDetails.valid);
      }
      setSubmittable(validationObj.valid && extraDetails.valid);
    };

    useEffect(() => {
      if (validate) {
        validationCheck({});
      } else {
        setInvalid(false);
        setInvalidText('');
      }
    }, [validate]);

    const onFocusHandler = e => {
      if (e.target.autocomplete) {
        e.target.autocomplete = 'whatever';
      }
      setActive(true);
      onFocus(e);
    };

    const onBlurHandler = e => {
      setActive(false);
      onBlur(e);
    };

    const onChangeHandler = e => {
      validationCheck({ current: e.target.value });
      onChange(e);
    };

    const allClasses = getClasses({
      active,
      disabled,
      value,
      animate,
      invalid,
      size,
    });

    const inputProps = {
      labelText,
      name,
      key,
      placeholder,
      type,
      invalid,
      autoFocus,
      invalidText,
      disabled,
      tabIndex,
      value,
      ref,
      autoComplete: 'new-password',
      onChange: onChangeHandler,
      onFocus: onFocusHandler,
      onBlur: onBlurHandler,
      ...allClasses,
      inputContainerClass: `${dimensionClasses} H($2xl) Ta(start)`,
      ...other,
    };

    return <BaseInput {...inputProps} />;
  },
);

Input.propTypes = {
  dataType: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  animate: PropTypes.bool,
  size: PropTypes.string,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  setSubmittable: PropTypes.func,
  validate: PropTypes.bool,
  extraValidation: PropTypes.func,
  validationList: PropTypes.array,
  dimensionClasses: PropTypes.string,
};

Input.defaultProps = {
  dataType: 'string',
  tabIndex: 1,
  value: '',
  dimensionClasses: 'W($30xl) M(a)',
  disabled: false,
  autoFocus: false,
  size: '30xl',
  validate: false,
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  extraValidation: () => ({
    valid: true,
    invalidText: '',
  }),
};

export default Input;
