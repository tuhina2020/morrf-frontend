import React from 'react';
import BaseIcon from 'components/atoms/BaseIcon';
import BaseImage from 'components/atoms/BaseImage';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
const PersonalDetails = ({ personal, onEdit }) => {
  const { firstName, lastName, profession, city, state } = personal;
  if (isEmpty(personal) || isEmpty(firstName) || isEmpty(lastName)) return null;
  return (
    <div className="Bdrs($xs) Bgc(white) H($fc) Maw($60xl)">
      <div className="D(f) Ai(s) Jc(sb) Px($lg) Pb($sm) Pt($mmd) Lh(1)">
        <div>
          <div className="Ff($ffmanrope) Fz($xml)">
            {firstName} {lastName}
          </div>
          <div className="Ff($ffopensans) Fz($md)">
            <div className="My($sm)">{profession}</div>
            <div>
              {city}, {state}
            </div>
          </div>
        </div>
        <BaseImage text={firstName[0].toUpperCase()} />
        <BaseIcon
          icon="edit"
          width="28px"
          height="28px"
          iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs) C($inputGrey)"
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

PersonalDetails.propTypes = {
  personal: PropTypes.object,
  onEdit: PropTypes.func,
};

export default PersonalDetails;
