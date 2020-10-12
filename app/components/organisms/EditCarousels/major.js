import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import Button from 'components/molecules/Button';

const GetStarted = ({ onStart, countEmptyLarge, countEmptySmall }) => {
  if (countEmptyLarge === 0 && countEmptySmall === 0) return null;
  const [open, setOpen] = useState(false);
  const saveProps = {
    iconDescription: 'Save',
    alignContent: 'center',
    kind: 'primary',
    size: 'fc',
    type: 'submit',
    roundCorners: true,
    onClick: () => {
      console.log('lol');
      onStart();
    },
  };

  if (countEmptyLarge > 1) {
    return (
      <div className="W($60xl) H($30xl) My($lg) Mx(a) Bgc(white) Bdrs($bdrsbutton) Ff($ffmanrope) D(f) Ai(c) Jc(c) Fld(c)">
        <BaseIcon icon="check" fill="lightgray" iconClasses="W($10x) H($10x)" />
        <div className="Fz($mmd) Lh(2.4) C($inputGrey)">
          Add more details about you to get more projects
        </div>
        <div className="My($lg) W($quarter)">
          <Button {...saveProps}>Lets get started</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="W($30xl) H($30xl) Bgc(white) Bdrs($bdrsbutton) Ff($ffmanrope) D(f) Ai(s) P($lg) Jc(s) Fld(c) Pos(a) T($20x) End($lg)">
        <BaseIcon icon="check" fill="lightgray" iconClasses="W($10x) H($10x)" />
        <div className="Fz($mmd) Lh(2.4) C($inputGrey)">
          Add more details about you to get more projects
        </div>
        <div className="My($lg) Mx(a)">
          <Button {...saveProps}>Lets get started</Button>
        </div>
      </div>
    );
  }
};

export default GetStarted;
