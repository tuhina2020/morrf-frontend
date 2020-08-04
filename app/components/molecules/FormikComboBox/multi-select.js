import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import FormikCheckBox from 'components/molecules/FormikCheckBox/dropdown';
import BaseIcon from 'components/atoms/BaseIcon';
import { Field } from 'formik';
import { warning as Warning } from 'Assets/svg-comp';
import { classnames } from 'utils/helper';

const CheckList = ({ items, id, selectedIds, onSelect, isOpen, maheight }) => {
  if (!isOpen) return null;
  return (
    <div
      id={`${id}_menu`}
      aria-labelledby={`${id}_input_label`}
      className="Bgc($navBarBg)"
    >
      {items.map((item, index) => (
        <div
          className={`Bgc($activeTagBlue):h Px($sm) Bxz(bb) Pos(r) Pb($xs) ${
            index === 0 ? 'Pt($md)' : 'Pt($xs)'
          } `}
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
              labelSize="sm"
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
  );
};

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
  width,
  maheight,
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

  const onChangeHandler = e => {
    onFilter(e.target.value);
    onChange(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = e => {
    setOpen(!isOpen);
  };

  const labelStyle = classnames({
    // 'Bxsh($bxshcheckbox)': true,
    // 'Pb($md)': true,
    // 'Px($sm)': true,
    'Bgc($hoverInput):h': true,
    'Bgc($hoverInput)': isOpen,
    'Bgc($navBarBg)': !isOpen,
    'C($headingDarkGrey)': true,
    'H($2xl)': true,
    [`W($${width})`]: true,
    'Pos(r)': true,
    'Bdb($bdheadingDarkGrey)': !isOpen,
    'Bd($bdprimaryButton):h': true,
    'Bdb($bdprimaryButton)': isOpen,
    'Bdrs($bdrsinput)': true,
    'Trsdu(0.3s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
    'Bxz(bb)': true,
  });

  return (
    <div
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={`${id}_menu`}
      aria-expanded={isOpen}
    >
      <div className={labelStyle} onClick={toggleOpen}>
        <div className="D(f) Ai(c) Jc(sb) Pt($sm) Px($sm)">
          <div className="Lh($md) Ff($ffmanrope) Fz($smd)">{labelText}</div>
          <div>
            <BaseIcon
              icon="showmore"
              iconClasses={`W($lg) H($lg) Trsdu(0.8s) Trsp(a) Trstf(e) ${
                isOpen ? 'Rotate(180deg)' : ''
              }`}
            />
          </div>
        </div>
      </div>
      <CheckList
        isOpen={isOpen}
        items={items}
        id={id}
        selectedIds={selectedIds}
        onSelect={onSelect}
        maheight={maheight}
      />
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
  maheight: PropTypes.string,
};

FormikComboBox.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  labelText: 'Label',
  autoComplete: 'off',
  tabIndex: 1,
  disabled: false,
  width: 'full',
  prependIcon: 'showmore',
  dimensionClasses: 'W($full)',
  onSelect: () => {},
  items: [],
  maheight: '10x',
};

export default FormikComboBox;
