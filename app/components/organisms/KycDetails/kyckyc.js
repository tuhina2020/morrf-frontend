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

const Kyckyc = ({ onEdit, viewOnly }) => {
  const [open, setOpen] = useState(true);
  if (!open) {
    return <Redirect to="/tabs" />;
  }
  return (
    <Display
      heading="KYC Information"
      topRightIcon={!viewOnly && 'externalLink'}
      onClickIcon={() => setOpen(false)}
    >
      <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
        <div className="Fz($md) My($xms)">Build your Tabs page now</div>
      </div>
    </Display>
  );
};
Kyckyc.propTypes = {
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  viewOnly: PropTypes.bool,
};

Kyckyc.defaultProps = {
  viewOnly: false,
  onAdd: () => {},
  onEdit: () => {},
};
export default Kyckyc;
