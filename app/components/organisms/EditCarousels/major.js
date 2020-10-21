import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import Button from 'components/molecules/Button';

const GetStarted = ({ onStart, countEmptyLarge, countEmptySmall, loading }) => {
  if ((countEmptyLarge === 0 && countEmptySmall === 0) || loading) return null;
  const [open, setOpen] = useState(false);
  const saveProps = {
    iconDescription: 'Save',
    alignContent: 'center',
    kind: 'primary',
    size: 'fc',
    type: 'submit',
    roundCorners: true,
    onClick: () => {
      onStart();
    },
  };

  if (countEmptyLarge > 1) {
    return (
      <div className="W($60xl) H(a) My($lg) P($lg) Mx(a) Bgc(white) Bdrs($bdrsbutton) Ff($ffmanrope) D(f) Ai(c) Jc(c) Fld(c)">
        {/* <BaseIcon icon="check" fill="lightgray" iconClasses="W($10x) H($10x)" /> */}
        <div className="Fz($mmd) Lh(1.5) C($inputGrey)">
          Add more details about you to get more projects
        </div>
        <div className="My($lg) W($quarter)">
          <Button {...saveProps}>Lets get started</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="W($30xl) H($30xl) Bgc(white) Bdrs($bdrsbutton) Ff($ffmanrope) D(f) Ai(c) P($lg) Jc(c) Fld(c) Pos(r) T(0) Start(80vw)">
        {/* <BaseIcon icon="check" fill="lightgray" iconClasses="W($10x) H($10x)" /> */}
        <div className="Fz($mmd) Lh(1.5) C($inputGrey)">
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
