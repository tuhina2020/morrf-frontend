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
  sliceInline,
  error,
}) => {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = e => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setOpen(!isOpen);
  };

  const invalid = error && error.length > 1;

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
    'Bdb($bdheadingDarkGrey)': !isOpen && !disabled && !invalid,
    'Bdb($bderrorColor)': invalid && !disabled,
    'Bdb($bddisabledGrey2)': disabled,
    'Bd($bdprimaryButton):h': !disabled,
    'Bdb($bdprimaryButton)': isOpen && !disabled,
    'Bdrs($bdrsinput)': true,
    'Trsdu(0.3s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
    'Bxz(bb)': true,
    'O(n)': true,
  });

  const inlineTagsList = values.slice(0, sliceInline);
  console.log('inline tags ', inlineTagsList);

  const InlineTags = () => (
    <>
      <div className="D(f) Ai(c) Jc(fs)">
        {inlineTagsList.map((skill, i) => (
          <div
            // className={
            //   inlineTagsList.length <= sliceInline && i === 1
            //     ? ''
            //     : i === inlineTagsList.length - 1
            //     ? 'Mend($sm)'
            //     : 'Mend($xs)'
            // }
            key={skill.id}
          >
            <Tag filter disabled={false} onDelete={() => deleteEntity(skill)}>
              {skill.name}
            </Tag>
          </div>
        ))}
      </div>
      {values.length > sliceInline ? (
        <div className="Mstart($xs) Bgc($checkboxMore) C($navBarBg) Ff($ffmanrope) Fw($fwbold) Fz($sm) Bdrs($xs) W($lg) H($md) Ta(c)">
          + {values.length - sliceInline}
        </div>
      ) : null}
    </>
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
        <div
          className={`D(f) Ai(c) Jc(fs) Pt($sm) Px($sm) Pos(r) ${
            inlineTagsList.length > 0 ? '' : 'T($xxs)'
          }`}
        >
          <div className="Lh($md) Ff($ffmanrope) Fz($smd) Whs(nw) C($inputGrey)">
            {inlineTagsList.length > 2 ? labelText.slice(0, 10) : labelText}
          </div>
          {inline && <InlineTags />}
          <BaseIcon
            icon="showmore"
            iconClasses={`W($lg) H($lg) Trsdu(0.8s) Trsp(a) Trstf(e) Pos(a) End(0) ${
              isOpen ? 'Rotate(180deg)' : ''
            }`}
          />
        </div>
      </div>
      <NestedFormikCheckList
        isOpen={isOpen}
        items={items}
        id={id}
        values={values}
        onSelect={onSelect}
      />
      <div
        className={`Ff($ffmanrope) C($error) Pstart($md) Fz($fzlabel) H($smd) Pos(a) ${
          invalid ? 'Op(1)' : 'Op(0)'
        } Trsdu(0.8s) Trsp(a) Trstf(e)`}
      >
        {error || ''}
      </div>
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
  sliceInline: PropTypes.number,
};

FormikComboBox.defaultProps = {
  labelText: 'Label',
  width: 'full',
  onSelect: () => {},
  items: [],
  tabIndex: 0,
  disabled: false,
  inline: false,
  sliceInline: 2,
  error: '',
};

export default FormikComboBox;
