import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import FormikCheckBox from 'components/molecules/FormikCheckBox/dropdown';
import BaseIcon from 'components/atoms/BaseIcon';
import { Field } from 'formik';
import { warning as Warning } from 'Assets/svg-comp';
import { classnames } from 'utils/helper';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

const parseNestedObj = items => {
  const initObj = groupBy(items, 'category');
  console.log(initObj === items);
  const finalList = [];
  Object.keys(initObj).forEach(category => {
    const obj = {
      category: initObj[category][0].category,
      groupLabel: initObj[category][0].groupLabel,
      options: initObj[category],
    };
    finalList.push(obj);
  });
  return finalList;
};

const CheckList = ({ items, id, values, onSelect, isOpen }) => {
  if (!isOpen || isEmpty(items)) return null;
  const iterableList = parseNestedObj(items);
  return (
    <div
      id={`${id}_menu`}
      aria-labelledby={`${id}_input_label`}
      className="Bgc($navBarBg) Ov(s) H($20x)"
    >
      {iterableList.map((item, index) => (
        <div
          className={`Bxz(bb) Pos(r) Bdb($bdinputGrey) Py($md)`}
          role="option"
          aria-selected="false"
          id={`${id}_item_${index}`}
          key={`${item.name}_${item.id}_${index}`}
        >
          <div className="Ff($ffmanrope) Fz($sm) Lh(1) Px($sm) C($headingDarkGrey) Pb($xs)">
            {item.groupLabel}
          </div>
          <div className="W($full) Ta(start)">
            {item.options.map((option, i) => {
              return (
                <div
                  key={option.id}
                  className={`Py($xs) Px($lg) Bgc($activeTagBlue):h`}
                >
                  <FormikCheckBox
                    name={`${option.name}.selected`}
                    value={values.includes(option.id)}
                    labelText={option.name}
                    labelSize="sm"
                    bluePosition="Start(58px)"
                    bgColorStyle="Bgc($navBarBg)"
                    onChange={e => {
                      const v = e.target.checked;
                      onSelect({ item: option, add: v });
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(v);
                      debugger;
                    }}
                  />
                </div>
              );
            })}
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
  labelText,
  autoComplete,
  tabIndex,
  disabled,
  items,
  dimensionClasses,
  values,
  onSelect,
  width,
}) => {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = e => {
    e.preventDefault();
    e.stopPropagation();
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
      className="W($full)"
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
        // items={parseNestedObj(items)}
        items={items}
        id={id}
        values={values}
        onSelect={onSelect}
      />
    </div>
  );
};

FormikComboBox.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSelect: PropTypes.func,
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  dimensionClasses: PropTypes.string,
};

FormikComboBox.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  labelText: 'Label',
  autoComplete: 'off',
  tabIndex: 1,
  disabled: false,
  width: 'full',
  prependIcon: 'showmore',
  dimensionClasses: 'W($full)',
  onSelect: () => {},
  items: [],
};

export default FormikComboBox;
