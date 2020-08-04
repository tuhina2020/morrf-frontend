import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import { classnames } from 'utils/helper';
import NestedFormikCheckList from 'components/molecules/FormikCheckList/nested';
import Tag from 'components/molecules/Tag';

const FormikComboBox = ({
  id,
  labelText,
  items,
  values,
  onSelect,
  width,
  tabIndex,
  disabled,
  inline,
  deleteEntity,
}) => {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = e => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setOpen(!isOpen);
  };

  const labelStyle = classnames({
    // 'Bxsh($bxshcheckbox)': true,
    // 'Pb($md)': true,
    // 'Px($sm)': true,
    'Bgc($hoverInput):h': !disabled,
    'Bgc($hoverInput)': isOpen && !disabled,
    'Bgc($navBarBg)': !isOpen || disabled,
    'C($headingDarkGrey)': !disabled,
    'C($disabledGrey2)': disabled,
    'H($2xl)': true,
    [`W($${width})`]: true,
    'Pos(r)': true,
    'Bdb($bdheadingDarkGrey)': !isOpen && !disabled,
    'Bdb($bddisabledGrey2)': disabled,
    'Bd($bdprimaryButton):h': !disabled,
    'Bdb($bdprimaryButton)': !disabled,
    'Bdrs($bdrsinput)': true,
    'Trsdu(0.3s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
    'Bxz(bb)': true,
    'O(n)': true,
  });

  const inlineTagsList = values.slice(0, 2);

  const InlineTags = () => (
    <div className="D(f) Ai(c) Jc(fs) Mend($sm)">
      {inlineTagsList.map((skill, i) => (
        <div
          className={
            inlineTagsList.length <= 2 && i === 1
              ? ''
              : i === inlineTagsList.length - 1
              ? 'Mend($sm)'
              : 'Mend($xs)'
          }
          key={skill.id}
        >
          <Tag filter disabled={false} onDelete={() => deleteEntity(skill)}>
            {skill.name}
          </Tag>
        </div>
      ))}
      {values.length > 2 ? (
        <div className="Mstart($xs) Bgc($checkboxMore) C($navBarBg) Ff($ffmanrope) Fw($fwbold) Fz($sm) Bdrs($xs) W($lg) H($md) Ta(c)">
          + {values.length - 2}
        </div>
      ) : null}
    </div>
  );

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
        onKeyDown={toggleOpen}
        tabIndex={tabIndex}
      >
        <div className="D(f) Ai(c) Jc(sb) Pt($sm) Px($sm)">
          <div className="Lh($md) Ff($ffmanrope) Fz($smd) Mend($sm)">
            {labelText}
          </div>
          <div className="D(f) Ai(c) Jc(fs)">
            {inline && <InlineTags />}
            <BaseIcon
              icon="showmore"
              iconClasses={`W($lg) H($lg) Trsdu(0.8s) Trsp(a) Trstf(e) ${
                isOpen ? 'Rotate(180deg)' : ''
              }`}
            />
          </div>
        </div>
      </div>
      <NestedFormikCheckList
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
  values: PropTypes.arrayOf(PropTypes.object),
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  deleteEntity: PropTypes.func,
};

FormikComboBox.defaultProps = {
  labelText: 'Label',
  width: 'full',
  onSelect: () => {},
  items: [],
  tabIndex: 0,
  disabled: false,
  inline: false,
};

export default FormikComboBox;
