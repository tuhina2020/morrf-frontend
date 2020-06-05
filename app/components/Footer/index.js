import React from 'react';
import EmailContainer from 'components/EmailContainer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Footer({ onSubmitForm }) {
  const emailPropsBottom = {
    containerClass: 'W(100%) D(f)',
    formClass: 'D(f) Ai(e) Jc(sb) W(50%)',
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
