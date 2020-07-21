import React, { useState } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import Modal from 'react-modal';
import AboutEditForm from 'components/organisms/ProfileEditForm/about';

const AboutMe = ({ about }) => {
  const [open, setOpen] = useState(false);
  Modal.setAppElement('#app');
  return (
    <>
      <DisplayCard
        heading="About Me"
        topRightIcon="edit"
        onClickIcon={() => {
          console.log('OPEN About');
          setOpen(true);
        }}
      >
        <div className="Ff($ffopensans) Fz($md) Lh(1.75)"> {about}</div>
      </DisplayCard>
      <Modal
        isOpen={open}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpen(false)}
        className="W($61xl) M(a) H($fc) Pos(r) T($quarter) Bd(n) O(n)"
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <AboutEditForm onCancel={() => setOpen(false)} about={about} />
      </Modal>
    </>
  );
};

export default AboutMe;
