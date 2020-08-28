import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import Button from 'components/molecules/Button';
import Modal from 'react-modal';
import DisplayCard from 'components/molecules/DisplayCard';
import GetStartedForm from 'components/organisms/EditCarousels/getStarted';

const GetStarted = ({ width, onStart }) => {
  const [open, setOpen] = useState(false);
  const saveProps = {
    iconDescription: 'Save',
    alignContent: 'center',
    kind: 'primary',
    size: 'full',
    type: 'submit',
    roundCorners: true,
    onClick: () => {
      console.log('lol');
      onStart();
    },
  };
  return (
    <div className="W($60xl) H($30xl) Bgc(white) Bdrs($bdrsbutton) M(a) Ff($ffmanrope) D(f) Ai(c) Jc(c) Fld(c) Pos(r) T($20x)">
      <BaseIcon icon="check" fill="lightgray" iconClasses="W($10x) H($10x)" />
      <div className="Fz($mmd) Lh(2.4) C($inputGrey)">
        Add more details about you to get more projects
      </div>
      <div className="My($lg) W($quarter)">
        <Button {...saveProps}>Lets get started</Button>
      </div>
      {/* <Modal
        isOpen={open}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpen(false)}
        className="W($61xl) M(a) H($fc) Pos(r) T($quarter) Bd(n) O(n)"
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <GetStartedForm profile={profile} />
      </Modal> */}
    </div>
  );
};

export default GetStarted;
