import React, { useState } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import Modal from 'react-modal';
import ExperienceEditForm from 'components/organisms/ProfileEditForm/experience';

const ExperienceDisplayCard = (experienceObj, i) => {
  const {
    designation,
    company,
    description,
    from,
    to,
    present,
  } = experienceObj;
  return (
    <div className="Ff($ffopensans) Fz($fzbutton) Lh(1)" key={company + from}>
      <div className="D(f) Ai(c) Jc(sb)">
        <div className="Fz($smx) Fw($fwsemibold)">{designation}</div>
        <div>
          {from} - {present ? 'present' : to}
        </div>
      </div>
      <div className="Mt($sm) Mb($mmd)">{company}</div>
      <div>{description}</div>
    </div>
  );
};

const Experience = ({ experience, onSave }) => {
  if (isEmpty(experience)) return null;
  const [open, setOpen] = useState(false);
  Modal.setAppElement('#app');
  return (
    <>
      <DisplayCard
        heading="Experience"
        topRightIcon="edit"
        onClickIcon={() => setOpen(true)}
      >
        {sortBy(experience, 'order').map(ExperienceDisplayCard)}
      </DisplayCard>
      <Modal
        isOpen={open}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpen(false)}
        className="W($61xl) M(a) H($fc) Pos(r) T($deci) Bd(n) O(n)"
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <ExperienceEditForm
          onCancel={() => setOpen(false)}
          onSave={onSave}
          experience={experience}
        />
      </Modal>
    </>
  );
};

export default Experience;
