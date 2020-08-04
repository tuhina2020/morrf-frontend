import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import { classnames } from 'utils/helper';
import FormikCheckList from 'components/molecules/FormikCheckList/nested';

const FormikComboBox = ({
  id,
  labelText,
  items,
  values,
  onSelect,
  width,
  tabIndex,
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
      className="W($full)"
      aria-haspopup="listbox"
      aria-owns={`${id}_menu`}
      aria-expanded={isOpen}
    >
      <div
        role="button"
        className={labelStyle}
        onClick={toggleOpen}
        onKeyDown={() => {}}
        tabIndex={tabIndex}
      >
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
      <FormikCheckList
        isOpen={isOpen}
        items={items}
        id={id}
        values={values}
        onSelect={onSelect}
      />
    </div>
  );
};

FormikComboBox.propTypes = {
  onSelect: PropTypes.func,
  labelText: PropTypes.string,
  width: PropTypes.string,
  id: PropTypes.string.isRequired,
  items: PropTypes.array,
  values: PropTypes.arrayOf(PropTypes.string),
  tabIndex: PropTypes.number,
};

FormikComboBox.defaultProps = {
  labelText: 'Label',
  width: 'full',
  onSelect: () => {},
  items: [],
  tabIndex: 1,
};

export default FormikComboBox;
