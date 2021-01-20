import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Display from 'components/molecules/Display';
import sortBy from 'lodash/sortBy';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import BaseIcon from 'components/atoms/BaseIcon';
import { classnames } from 'utils/helper';
import Modal from 'react-modal';

const Kycpage = ({ onAdd, onEdit, viewOnly }) => {
  const [Auth, setAuth] = useState(true);
  if (!Auth) {
    return <Redirect to="/profile/details" />;
  }
  return (
    <div className="Fz($smd) My($xms)">
      <BaseIcon
        icon="arrowback"
        width="26px"
        height="26px"
        fill="#0000FF"
        onClick={() => setAuth(false)}
      />
      Go back to Profile Page
    </div>
  );
};
Kycpage.propTypes = {
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  viewOnly: PropTypes.bool,
};

Kycpage.defaultProps = {
  viewOnly: false,
  onAdd: () => {},
  onEdit: () => {},
};
export default Kycpage;
