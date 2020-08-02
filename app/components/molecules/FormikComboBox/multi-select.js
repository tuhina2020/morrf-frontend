import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import FormikCheckBox from 'components/molecules/FormikCheckBox';
import { Field } from 'formik';
import { useCombobox } from 'downshift';
import { warning as Warning } from 'Assets/svg-comp';

const getClasses = ({ active, disabled, value, invalid = false }) => ({
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
  inputClasses: `Bd(n) Cur(a) W(100%) Pb($sm) Pt($smx) Pstart($md) Fz($fzbutton) C($inputGrey) C($inputGrey)::ph Bdrs($bdrsinput) Pos(r)::ph T(2px):ph Bg(i) ${
    active ? 'Op(1)::ph' : 'Op(0)::ph'
  } Trsdu(0.6s)::ph Trsp(a)::ph Trstf(e)::ph`,
  warningClasses: `C($error) W($md) H($md) Pos(r) T($md) End($md) ${
    invalid ? 'Op(1)' : 'Op(0)'
  } Trsdu(0.8s) Trsp(a) Trstf(e)`,
  errorMessageClasses: `Ff($ffmanrope) C($error) Pstart($md) Fz($fzlabel) H($smd) ${
    invalid ? 'Op(1)' : 'Op(0)'
  } Trsdu(0.8s) Trsp(a) Trstf(e)`,
  warningContainerClass: 'D(f) Ai(c) Jc(c) W($md) H($md)',
});

const FormikComboBox = ({
  id,
  name,
  type,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  labelText,
  autoComplete,
  tabIndex,
  disabled,
  items,
  dimensionClasses,
  selectedIds,
  onSelect,
  value,
  onFilter,
}) => {
  // const [inputItems, setInputItems] = useState(items);
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
  // const {
  //   isOpen,
  //   selectedItem,
  //   getToggleButtonProps,
  //   getLabelProps,
  //   getMenuProps,
  //   getInputProps,
  //   getComboboxProps,
  //   highlightedIndex,
  //   getItemProps,
  //   selectHighlightedItem,
  // } = useCombobox({
  //   items,
  //   itemToString: item => (item ? item.name : ''),
  //   onInputValueChange: ({ inputValue }) =>
  //     inputValue && inputValue !== '[object Object]' && onFilter(inputValue),
  // });
  // const classes = getClasses({ active, disabled, value });

  const onChangeHandler = e => {
    onFilter(e.target.value);
    onChange(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const [isOpen, setOpen] = useState(items.length > 0);
  return (
    <div
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={`${id}_menu`}
      aria-expanded={isOpen}
    >
      {/* <FormikInput
        name={name}
        id={`${id}_input`}
        label="Select one or more skills"
        tabIndex={tabIndex}
        autoComplete="off"
        dimensionClasses="W($full)"
        // error={getError('to', index)}
        value={value}
        aria-autocomplete="list"
        aria-controls={`${id}_menu`}
        aria-labelledby={`${id}_input_label`}
        onChange={onChangeHandler}
      /> */}
      <div>{labelText}</div>
      <div
        id={`${id}_menu`}
        aria-labelledby={`${id}_input_label`}
        className="Bgc($navBarBg)"
      >
        {items.map((item, index) => (
          <div
            className="Bgc($activeTagBlue):h Pstart($sm) Py($xs)"
            role="option"
            aria-selected="false"
            id={`${id}_item_${index}`}
            key={`${item.name}_${item.id}_${index}`}
          >
            <div className="W($full) Ta(start)">
              <FormikCheckBox
                name={`${name}.selected`}
                value={selectedIds.includes(item.id)}
                labelText={item.name}
                labelSize="md"
                bluePosition="Start(58px)"
                bgColorStyle="Bgc($navBarBg)"
                onChange={e => {
                  const v = e.target.checked;
                  console.log(v);
                  onSelect({ item, add: v });
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FormikComboBox.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  dimensionClasses: PropTypes.string,
};

FormikComboBox.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  labelText: 'Label',
  autoComplete: 'off',
  tabIndex: 1,
  disabled: false,
  prependIcon: 'showmore',
  dimensionClasses: 'W($full)',
  onSelect: () => {},
  items: [],
};

export default FormikComboBox;
