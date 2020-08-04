import React from 'react';
import PropTypes from 'prop-types';
import FormikCheckBox from 'components/molecules/FormikCheckBox/dropdown';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

const parseNestedObj = items => {
  const initObj = groupBy(items, 'category');
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

const NestedFormikCheckList = ({ items, id, values, onSelect, isOpen }) => {
  if (!isOpen || isEmpty(items)) return null;
  const iterableList = parseNestedObj(items);
  const selectedIds = values.map(sk => sk.id);
  return (
    <div
      id={`${id}_menu`}
      aria-labelledby={`${id}_input_label`}
      className="Bgc($navBarBg) Ov(s) H($20x)"
    >
      {iterableList.map((item, index) => (
        <div
          className="Bxz(bb) Pos(r) Bdb($bdinputGrey) Py($md)"
          role="option"
          aria-selected="false"
          id={`${id}_item_${index}`}
          key={`${item.name}_${item.id}`}
        >
          <div className="Ff($ffmanrope) Fz($sm) Lh(1) Px($sm) C($headingDarkGrey) Pb($xs)">
            {item.groupLabel}
          </div>
          <div className="W($full) Ta(start)">
            {item.options.map(option => (
              <div
                key={option.id}
                className="Py($xs) Px($lg) Bgc($activeTagBlue):h"
              >
                <FormikCheckBox
                  name={`${option.name}.selected`}
                  value={selectedIds.includes(option.id)}
                  labelText={option.name}
                  labelSize="sm"
                  bluePosition="Start(58px)"
                  bgColorStyle="Bgc($navBarBg)"
                  onChange={e => {
                    const v = e.target.checked;
                    onSelect({ item: option, add: v });
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

NestedFormikCheckList.propTypes = {
  isOpen: PropTypes.bool,
  onSelect: PropTypes.func,
  id: PropTypes.string.isRequired,
  items: PropTypes.array,
  values: PropTypes.arrayOf(PropTypes.object),
};

NestedFormikCheckList.defaultProps = {
  isOpen: false,
  onSelect: () => {},
  items: [],
};

export default NestedFormikCheckList;
