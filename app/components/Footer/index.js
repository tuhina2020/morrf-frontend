import React from 'react';
import EmailContainer from 'components/EmailContainer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Footer({ onSubmitForm, isDesktopOrLaptop }) {
  const emailPropsBottom = {
    formClass: isDesktopOrLaptop
      ? 'D(f) Ai(c) Jc(sb) W(50%)'
      : 'D(f) Fld(c) Mt(5vw)',
    containerClass: isDesktopOrLaptop ? 'D(f) W(100%)' : '',
    submitSuccessStyle: isDesktopOrLaptop
      ? 'Fz($fzcaption) Mb(3vw)'
      : 'Fz($fzlarge) Fld(c)',
    onSubmitForm,
  };
  return (
    <div
      className={`${
        isDesktopOrLaptop ? 'Pt(2vw) Pb(1vw) Px(16.7vw)' : 'Py(3vw) Px(5.5vw)'
      } Bdt($bdsolidLightestGray)`}
    >
      <div
        className={`${
          isDesktopOrLaptop ? 'Fz($fzbody)' : 'Fz($fzlarge)'
        } Fw($fwmedium) C($subheadingDarkGrey)`}
      >
        Get the update from us when we launch
      </div>
      <EmailContainer
        {...emailPropsBottom}
        isDesktopOrLaptop={isDesktopOrLaptop}
      />

      <div
        className={`${
          isDesktopOrLaptop
            ? 'Fz($fzcaption)'
            : 'Fz($fzmobilesubheading) Mt(7vw)'
        } C($bodyGrey) Mb(1.3vw)`}
      >
        Reach us at:{' '}
        <Link
          to="mailto : contact@morff.io"
          className="Td(n) C($placeholderGrey)"
        >
          contact@morff.io
        </Link>
      </div>

      <div
        className={`${
          isDesktopOrLaptop ? 'Fz($fzcaption)' : 'Fz($fzmobilesubheading)'
        } C($lightestGray)`}
      >
        &copy; 2020 Morff
      </div>
    </div>
  );
}

Footer.propTypes = {
  onSubmitForm: PropTypes.func,
};
