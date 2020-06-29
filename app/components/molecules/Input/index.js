import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { classnames, getTransitionClass } from 'utils/helper';
import isObject from 'lodash/isObject';
import BaseInput from 'components/atoms/BaseInput';

const getClasses = ({ active, disabled, value, invalid, animate }) => {
  console.log('ACTIVE ', active, value);
  return {
    labelClasses: `Pos(r) Pstart($md) W(fc) H($2xl) Pb($sm) Pt($smx) Pstart($md) Trsdu(0.5s) Trsp(a) Trstf(e) Cur(a) ${
      disabled ? 'C($disabledGrey2)' : ''
    } ${
      active && !disabled
        ? (invalid ? 'C($error)' : 'C($primaryButton)') + ' T($xl) Fz($fzlabel)'
        : 'T($2xl) Fz($fzbutton) C($inputGrey)'
    }`,
    inputContainerClass: `W($30xl) M(a) Ta(start)`,
    inputWrapperClasses: `Ff($ffmanrope) ${
      invalid ? 'Bdb($bderrorColor)' : 'Bdb($bdinputGrey)'
    } D(f) C($inputGrey)::ph Bgc($navBarBg) Bdrs($bdrsinput) ${
      disabled ? '' : 'Bgc($hoverInput):h'
    } Trsdu(0.5s) Trsp(a) Trstf(e)`,
    inputClasses: `Bd(n) Cur(a) W(100%) Pb($sm) Pt($smx) Pstart($md) Fz($fzbutton) H($2xl) C($inputGrey) C($inputGrey)::ph Op(1)::ph Bdrs($bdrsinput) Pos(r)::ph T(2px):ph Bg(i)`,
    warningClasses: `C($error) W($md) H($md) ${
      invalid ? 'Op(1)' : 'Op(0)'
    } Trsdu(0.5s) Trsp(a) Trstf(e)`,
    errorMessageClasses: `C($error) Pstart($md) Fz($fzbutton) Mt($xxs) H($smd) ${
      invalid ? 'Op(1)' : 'Op(0)'
    } Trsdu(0.5s) Trsp(a) Trstf(e)`,
  };
};

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
      invalid,
      invalidText,
      tabIndex,
      disabled,
      value,
      ...other
    },
    ref,
  ) => {
    const [active, setActive] = useState(value.length > 0);

    const onFocusHandler = e => {
      setActive(true);
      onFocus(e);
    };

    const onBlurHandler = e => {
      setActive(value.length > 0 || false);
      onBlur(e);
    };

    const allClasses = getClasses({
      active,
      disabled,
      value,
      animate,
      invalid,
    });

    const inputProps = {
      labelText,
      name,
      placeholder,
      type,
      invalid,
      autoFocus,
      invalidText,
      disabled,
      tabIndex,
      value,
      autoComplete: 'off',
      onChange,
      onFocus: onFocusHandler,
      onBlur: onBlurHandler,
      ...allClasses,
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
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  animate: PropTypes.bool,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  dataType: 'string',
  placeholder: '',
  tabIndex: 1,
  value: '',
  invalid: false,
  disabled: false,
  autoFocus: false,
};

export default Input;
