import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { classnames } from 'utils/helper';
import { Field } from 'formik';

const FormikCheckbox = React.forwardRef((props, ref) => {
  const [focus, setFocus] = useState(false);
  const inputStyles = classnames({
    'W(0)': true,
    'H(0)': true,
    'Op(0)': true,
  });

  const checkmarkStyle = classnames({
    'W($xms)': true,
    'H($xss)': true,
    'Rotate(45deg)': true,
    'Pos(r)': true,
    'Op(0)': !props.value,
    'Op(1)': props.value,
    'End($xss)': true,
    'B(-1px)': true,
    // 'B(1px)': true,
    'Bdc(white)': true,
    'Bds(s)': true,
    'Bdw($bdcheckmark)': true,
    'Z(2)': true,
    // 'Start($xss)': true,
  });

  const checkmarkBg = classnames({
    'W($md)': true,
    'H($md)': true,
    'Bd($bdcheckbox)': !props.disabled,
    'Bd($bddisabledGrey2)': props.disabled,
    'Bgc($headingDarkGrey)': props.value && !props.disabled,
    'Bgc($checkBoxBg)': !props.value && !props.disabled,
    'Bgc($disabledGrey2)': props.value && props.disabled,
    // [props.bgColorStyle]: !props.value,
    'Bgc($navBarBg):h': !props.value,
    // 'Bd($primaryButton)': focus,
    // 'T(0)': true,
    'Bdrs($3xs)': true,
    'Z(1)': true,
    'Pos(r)': true,
    // 'Bg(i)': true,
  });

  const blueBorderOnFocus = classnames({
    'W($mmd)': true,
    'Bdrs($xxs)': true,
    'H($mmd)': true,
    'Bgc(blue)': true,
    'Pos(a)': true,
    'Start(-2px)': true,
    'B(-2px)': true,
    // [props.bluePosition]: true,
    'Z(0)': true,
    'Op(0)': !focus,
    'Trsdu(0.3s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
  });

  const labelStyle = classnames({
    'Ff($ffmanrope)': true,
    'Mstart($xxs)': true,
    [`Fz($${props.labelSize})`]: true,
    'C($disabledGrey2)': props.disabled,
    'Lh(1)': true,
  });

  return (
    <Field name={props.name}>
      {({ field }) => (
        <label className="D(f) Jc(fs) Cur(p) Bg(i) W($full) Pos(r)">
          <span className={checkmarkBg} />
          <span className={checkmarkStyle} />
          <span className={blueBorderOnFocus} />
          <input
            className={inputStyles}
            {...field}
            disabled={props.disabled}
            type="checkbox"
            tabIndex={props.tabIndex}
            checked={props.value}
            onChange={e => {
              e.preventDefault();
              e.stopPropagation();
              props.onChange(e);
            }}
            aria-checked={props.value}
            onFocus={() => setFocus(true)}
            ref={ref}
            onBlur={() => setFocus(false)}
          />
          <div className={labelStyle}>{props.labelText}</div>
        </label>
      )}
    </Field>
  );
});

FormikCheckbox.propTypes = {
  labelText: PropTypes.string,
  value: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  labelSize: PropTypes.string,
  bluePosition: PropTypes.string,
};

FormikCheckbox.defaultProps = {
  disabled: false,
  labelText: 'Label',
  labelSize: 'sm',
  bluePosition: 'Start(-2px)',
  tabIndex: 0,
};

export default FormikCheckbox;
