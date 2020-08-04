import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import FormikCheckBox from 'components/molecules/FormikCheckBox';

const FormikComboBox = ({
  id,
  name,
  type,
  onFocus,
  onBlur,
  onChange,
  items,
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
      <FormikInput
        name={name}
        id={`${id}_input`}
        label="Select one or more skills"
        autoComplete="off"
        dimensionClasses="W($full)"
        // error={getError('to', index)}
        value={value}
        aria-autocomplete="list"
        aria-controls={`${id}_menu`}
        aria-labelledby={`${id}_input_label`}
        onChange={onChangeHandler}
        onFocus={onFocusWrapper}
        onBlur={onBlurWrapper}
      />
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
            key={`${item.name}_${item.id}`}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  selectedIds: PropTypes.array,
  onSelect: PropTypes.func,
  onFilter: PropTypes.func,
  items: PropTypes.array,
};

FormikComboBox.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  onSelect: () => {},
  items: [],
};

export default FormikComboBox;
