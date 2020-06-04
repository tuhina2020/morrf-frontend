import React from 'react';
import EmailContainer from 'components/EmailContainer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Footer({ onSubmitForm }) {
  const emailPropsBottom = {
    inputDetails: [
      {
        key: 'name',
        type: 'name',
        widthStyle: 'W(30%) Mend(1vw)',
        placeholder: 'Name',
        labelStyle: 'C($themeColor) Fz(0.6vw)',
      },
      {
        key: 'email',
        type: 'email',
        widthStyle: 'W(70%)',
        placeholder: 'Email address',
        labelStyle: 'C($themeColor) Fz(0.6vw)',
      },
    ],
    placeholderStyle: {
      active: 'C($themeColor):ph',
      inactive: 'C($lightGrey)::ph',
      common: 'Ff($ffmont)::ph Fz(0.8vw)::ph',
    },
    containerClass: 'Mend(1vw) W(100%) D(f)',
    inputClass:
      'Bd(n) Bdb($bdnewGrey) W(100%) Pb(0.2vw) Ff($ffmont) Fz(0.8vw) C($themeColor):h::ph Op(1)::ph',
    submitStyle: {
      inactive: 'Bd($bdprimaryDarkGrey) C($primaryDarkGrey) Bgc(white)',
      active:
        'Bd($bdthemeColor) C($primaryDarkGrey) Bd($bdthemeColor):h C($themeColor):h Bgc(white)',
      clicked: 'C(white) Bgc($themeColor) Bd(n)',
      common: 'Bdrs(0.2vw) W(5vw) H(2vw) Ff($ffmont) Fz(0.8vw) Bgc(white)',
      success: 'Bdrs(0.2vw) Px(1vw) Py(0.5vw) Ff($ffmont) Fz(0.8vw)',
    },
    formClass: 'D(f) Ai(fe) Jc(sb) W(50%)',
    onSubmitForm,
  };
  return (
    <div className="Pt(2vw) Pb(1vw) Px(16.7vw) Bdt($bdsolidLightestGray)">
      <div className="Fz($fzbody) Fw($fwmedium)">
        Get the update from us when we launch
      </div>
      <div className="Mt(2vw)">
        <EmailContainer {...emailPropsBottom} />
      </div>

      <div className="Fz($fzcaption) C($mediumGrey) Mb(1.3vw)">
        Reach us at:{' '}
        <Link to="mailto : contact@morff.io" className="Td(n) C($mediumGrey)">
          contact@morff.io
        </Link>
      </div>

      <div className="Fz($fzcaption) C($lightestGray)">&copy; 2020 Morff</div>
    </div>
  );
}

Footer.propTypes = {
  onSubmitForm: PropTypes.func,
};
