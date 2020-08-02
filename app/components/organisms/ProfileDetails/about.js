import React, { useState } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import Modal from 'react-modal';
import AboutEditForm from 'components/organisms/ProfileEditForm/about';
import isEmpty from 'lodash/isEmpty';

const AboutMe = ({ about, onSave, onEdit }) => {
  if (isEmpty(about)) return null;
  const [open, setOpen] = useState(false);
  Modal.setAppElement('#app');
  return (
    <DisplayCard heading="About Me" topRightIcon="edit" onClickIcon={onEdit}>
      <div className="Ff($ffopensans) Fz($md) Lh(1.75)"> {about}</div>
    </DisplayCard>
  );
};

export default AboutMe;
