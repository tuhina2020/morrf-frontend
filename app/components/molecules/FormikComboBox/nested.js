import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import { classnames } from 'utils/helper';
import NestedFormikCheckList from 'components/molecules/FormikCheckList/nested';
import Tag from 'components/molecules/Tag';

const FormikComboBox = ({
  id,
  labelText,
  items,
  viewableValues,
  onChange,
  width,
  disabled,
  inline,
  sliceInline,
  error,
}) => {
  const [isOpen, setOpen] = useState(false);
  const setOpenValue = (e, set) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    // debugger;
    setOpen(set);
  };

  const invalid = error && error.length > 1;

  const selectObj = ({ item, add = false }) => {
    const newValues = add
      ? [...viewableValues, item]
      : viewableValues.filter(sk => sk.id !== item.id);
    onChange(newValues);
  };

  const deleteValues = skill => {
    selectObj({
      item: skill,
    });
  };

  const inputStyle = classnames({
    // 'Bxsh($bxshcheckbox)': true,
    // 'Pb($md)': true,
    // 'Px($sm)': true,
    // 'Bdt(n)': true,
    // 'Bdstart(n)': true,
    // 'Bdend(n)': true,
    'Bd(n)': true,
    'Bdb($bdheadingDarkGrey)': !isOpen && !disabled && !invalid,
    'Bdb($bderrorColor)': invalid && !disabled,
    'Bgc($hoverInput):h': !disabled,
    'Bgc($hoverInput)': isOpen && !disabled,
    'Bgc($navBarBg)': !isOpen || disabled,
    'C($headingDarkGrey)': !disabled,
    'C($disabledGrey2)': disabled,
    'H($2xl)': true,
    [`W($${width})`]: true,
    'Pos(r)': true,
    'Bdrs($bdrsinput)': true,
    'Trsdu(0.3s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
    'Bxz(bb)': true,
    'O(n)': true,
    'Bdb($bddisabledGrey2)': disabled,
    'Bdb($bdprimaryButton):h': !disabled,
    'Bdb($bdprimaryButton)': isOpen && !disabled,
  });

  const labelStyle = classnames({
    'H(fc)': true,
    'Lh($md)': true,
    'Ff($ffmanrope)': true,
    'Fz($smd)': true,
    'Whs(nw)': true,
    'C($inputGrey)': true,
    // 'Pos(a)': true,
  });

  // const labelWrapper = classNa;

  const inlineTagsList = viewableValues.slice(0, sliceInline);

  const InlineValues = useCallback(
    () => (
      <>
        <div className="D(f) Ai(c) Jc(fs)">
          {inlineTagsList.map((val, i) => (
            <div key={val.id + '_inline' + i} className="Mend($xxs)">
              <Tag filter disabled={false} onDelete={() => deleteValues(val)}>
                {val.name}
              </Tag>
            </div>
          ))}
          {viewableValues.length > sliceInline ? (
            <div className="Mstart($xs) Bgc($checkboxMore) C($navBarBg) Ff($ffmanrope) Fw($fwbold) Fz($sm) Bdrs($xs) W($lg) H($md) Ta(c)">
              + {viewableValues.length - sliceInline}
            </div>
          ) : null}
        </div>
      </>
    ),
    [viewableValues],
  );

  const NotInlineValues = () => (
    <div className="D(f) Ai(c) Jc(s) Mb($sm) Flw(w)">
      {viewableValues.map((val, i) => (
        <div className="Mend($sm) Mb($sm)" key={val.id + '_notinline_' + i}>
          <Tag filter disabled={false} onDelete={() => deleteValues(val)}>
            {val.name}
          </Tag>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {!inline && <NotInlineValues />}
      <div
        className="W($full) Pos(r)"
        aria-haspopup="listbox"
        aria-owns={`${id}_menu`}
        aria-expanded={isOpen}
      >
        {/* <div
          role="button"
          className={labelStyle}
          onClick={toggleOpen}
          onKeyDown={toggleOpen}
          tabIndex={0}
        > */}
        <div
          className={inputStyle}
          // readOnly
          // id={id}
          // autoComplete="off"
          // onFocus={e => setOpenValue(e, !isOpen)}
          // onBlur={e => setOpenValue(e, false)}
          tabIndex={0}
        >
          <div
            className={`D(f) Ai(c) Jc(sb) Px($sm) Pos(a)  T(0) H($2xl) W($full)`}
            onClick={e => setOpenValue(e, !isOpen)}
          >
            <div className={labelStyle}>{labelText}</div>

            {inline && <InlineValues />}
            <BaseIcon
              icon="showmore"
              iconClasses={`W($lg) H($lg) Trsdu(0.8s) Trsp(a) Trstf(e) ${
                isOpen ? 'Rotate(180deg)' : ''
              }`}
            />
          </div>
        </div>
        <NestedFormikCheckList
          isOpen={isOpen}
          items={items}
          id={id}
          values={viewableValues}
          onSelect={selectObj}
        />
        <div
          className={`Ff($ffmanrope) C($error) Pstart($md) Fz($fzlabel) H($smd) Pos(a) ${
            invalid ? 'Op(1)' : 'Op(0)'
          } Trsdu(0.8s) Trsp(a) Trstf(e)`}
        >
          {error || ''}
        </div>
      </div>
    </>
  );
};

FormikComboBox.propTypes = {
  onChange: PropTypes.func,
  labelText: PropTypes.string,
  width: PropTypes.string,
  id: PropTypes.string.isRequired,
  items: PropTypes.array,
  initValues: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  sliceInline: PropTypes.number,
};

FormikComboBox.defaultProps = {
  labelText: 'Label',
  width: 'full',
  onChange: () => {},
  items: [],
  disabled: false,
  inline: false,
  sliceInline: 2,
  error: '',
};

export default FormikComboBox;
