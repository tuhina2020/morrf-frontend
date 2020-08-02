import React, { useState } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import Modal from 'react-modal';
import PortfolioEditForm from 'components/organisms/ProfileEditForm/portfolio';

const ImageDisplayCard = (image, i) => {};

const PortfolioDisplayCard = (folioObj, i) => {
  const { project, year, description, images, order } = folioObj;
  return (
    <div className="Ff($ffopensans) Lh(1)" key={order}>
      <div className="D(f) Ai(b) Jc(s)">
        <div className="Fw($fwsemibold) Mend($md) Fz($smx)">{project}</div>
        <div className="Fz($smd)">{year}</div>
      </div>
      <div className="Mt($md) Mb($lg)">{description}</div>
      <div>{JSON.stringify(images)}</div>
    </div>
  );
};

const Portfolio = ({ portfolio, onSave }) => {
  if (isEmpty(portfolio)) return null;
  Modal.setAppElement('#app');
  const [open, setOpen] = useState(false);
  return (
    <>
      <DisplayCard
        heading="Portfolio"
        topRightIcon="edit"
        onClickIcon={() => setOpen(true)}
      >
        {/* <div className="Ff($ffopensans) Fz($md) Lh(1.75)">
        {JSON.stringify(portfolio, 2)}
      </div> */}
        {sortBy(portfolio, 'order').map(PortfolioDisplayCard)}
      </DisplayCard>
      <Modal
        isOpen={open}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpen(false)}
        className="W($61xl) M(a) H($fc) Pos(r) T($quarter) Bd(n) O(n)"
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <PortfolioEditForm
          onCancel={() => setOpen(false)}
          onSave={onSave}
          portfolio={portfolio}
        />
      </Modal>
    </>
  );
};

export default Portfolio;
