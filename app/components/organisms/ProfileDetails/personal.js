import React, { useState } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import BaseIcon from 'components/atoms/BaseIcon';
import BaseImage from 'components/atoms/BaseImage';
import isEmpty from 'lodash/isEmpty';

const PersonalDetails = ({ personal, onSave, onEdit }) => {
  if (isEmpty(personal)) return null;
  console.log(personal);
  const { firstName, lastName, profession, city, state } = personal;
  // const [open, setOpen] = useState(false);
  // Modal.setAppElement('#app');

  return (
    <div className="Bdrs($xs) M($lg) Bgc(white) H($fc) Maw($60xl)">
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
          iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs)"
          fill="#0847f4"
          onClick={() => {
            console.log('OPEN PERSONAL');
            onEdit();
          }}
        />
      </div>
      {/* <Modal
        isOpen={open}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpen(false)}
        className="W($61xl) M(a) H($fc) Pos(r) T($quarter) Bd(n) O(n)"
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <ProfileEditForm
          onCancel={() => setOpen(false)}
          city={city}
          state={state}
          onSave={onSave}
          profession={profession}
          firstName={firstName}
          lastName={lastName}
        />
      </Modal> */}
    </div>
  );
};

export default PersonalDetails;
