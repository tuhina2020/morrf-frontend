import React, { useState } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import BaseIcon from 'components/atoms/BaseIcon';
import Modal from 'react-modal';
import ContactEditForm from 'components/organisms/ProfileEditForm/contact';

const Contact = ({ phone, email }) => {
  const [open, setOpen] = useState(false);
  Modal.setAppElement('#app');

  return (
    <>
      <DisplayCard
        heading="Contact Information"
        topRightIcon="edit"
        onClickIcon={() => {
          console.log('OPEN Contact');
          setOpen(true);
        }}
      >
        <div className="D(f) Ai(c) Jc(s) Ff($ffopensans) Fz($md)">
          <div className="W($half)">
            <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">Phone</div>
            <div className="D(f) Ai(c) Jc(s)">
              <div className="Fz($smd) Mend($xs)">{phone.number}</div>
              {phone.verified ? (
                <BaseIcon
                  icon="checkcircle"
                  width="16px"
                  height="16px"
                  fill="#00a04a"
                />
              ) : (
                <BaseIcon
                  icon="warning"
                  width="16px"
                  height="16px"
                  fill="#ff0356"
                />
              )}
            </div>
          </div>
          <div className="W($half)">
            <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">Email id</div>
            <div className="D(f) Ai(c) Jc(s)">
              <div className="Fz($smd) Mend($xs)">{email.id}</div>
              {email.verified ? (
                <BaseIcon
                  icon="checkcircle"
                  width="16px"
                  height="16px"
                  fill="#00a04a"
                />
              ) : (
                <BaseIcon
                  icon="warning"
                  width="16px"
                  height="16px"
                  fill="#ff0356"
                />
              )}
            </div>
          </div>
        </div>
      </DisplayCard>
      <Modal
        isOpen={open}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpen(false)}
        className="W($61xl) M(a) H($fc) Pos(r) T($quarter) Bd(n) O(n)"
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <ContactEditForm
          onCancel={() => setOpen(false)}
          phone={phone}
          email={email}
        />
      </Modal>
    </>
  );
};

export default Contact;
