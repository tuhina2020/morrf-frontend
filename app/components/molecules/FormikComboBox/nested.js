import React, { useState, useCallback, useEffect } from 'react';
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
  tabIndex,
  isDesktopOrLaptop,
  focusComboBox,
  setFocus,
}) => {
  const [isOpen, setOpen] = useState(focusComboBox);
  const setOpenValue = (e, set) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    // debugger;
    console.log('SETTING OPEN AND FOCUS TO ', set);
    setOpen(set);
    setFocus(set);
  };

  const invalid = error && error.length > 1;

  const selectObj = ({ item, add = false }) => {
    const newValues = add
      ? [...viewableValues, item]
      : viewableValues.filter(sk => sk.id !== item.id);
    setOpen(true);
    setFocus(true);
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
    'Mend($sm)': true,
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
          <Tag
            filter
            disabled={false}
            onDelete={() => deleteValues(val)}
            tabIndex={-1}
          >
            {val.name}
          </Tag>
        </div>
      ))}
    </div>
  );

  return (
    <div className="W($full) Pos(r)">
      {!inline && <NotInlineValues />}
      <div
        className="W($full) Pos(a) Z(2)"
        aria-haspopup="listbox"
        aria-owns={`${id}_menu`}
        aria-expanded={isOpen}
      >
        <input
          // type="hidden"
          id="lol"
          tabIndex={tabIndex}
          className="Op(0) Pos(a) T(0) W($full) H($full)"
          focus={isOpen.toString()}
          onFocus={e => {
            console.log('FOCUS');
            setOpenValue(e, true);
          }}
          onBlur={e => {
            console.log('BLUR');
            setOpenValue(e, false);
          }}
        />
        <div
          className={inputStyle}
          // readOnly
          // id={id}
          // autoComplete="off"
        >
          <div
            className={`D(f) Ai(c) Jc(s) Px($sm) Pos(a) T(0) H($2xl) W($full)`}
            onClick={e => setOpenValue(e, !isOpen)}
          >
            <div className={labelStyle}>{labelText}</div>

            {inline && <InlineValues />}
            <BaseIcon
              icon="showmore"
              iconClasses={`W($lg) H($lg) Trsdu(0.8s) Trsp(a) Trstf(e) Pos(a) ${
                isDesktopOrLaptop ? 'End($sm)' : 'End($xms)'
              } ${isOpen ? 'Rotate(180deg)' : ''}`}
            />
          </div>
        </div>
        <NestedFormikCheckList
          isOpen={isOpen}
          items={items}
          id={id}
          values={viewableValues}
          onSelect={selectObj}
          tabIndex={-1}
        />
        <div
          className={`Ff($ffmanrope) C($error) Pstart($md) Fz($fzlabel) H($smd) Pos(a) ${
            invalid ? 'Op(1)' : 'Op(0)'
          } Trsdu(0.8s) Trsp(a) Trstf(e)`}
        >
          {error || ''}
        </div>
      </div>
    </div>
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
  tabIndex: 0,
  setFocus: () => {},
  focusComboBox: false,
};

export default FormikComboBox;
