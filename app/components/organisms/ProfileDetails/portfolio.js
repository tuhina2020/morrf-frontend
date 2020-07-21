import React from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';

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

const Portfolio = ({ portfolio }) => {
  return (
    <DisplayCard heading="Portfolio" topRightIcon="edit">
      {/* <div className="Ff($ffopensans) Fz($md) Lh(1.75)">
        {JSON.stringify(portfolio, 2)}
      </div> */}
      {sortBy(portfolio, 'order').map(PortfolioDisplayCard)}
    </DisplayCard>
  );
};

export default Portfolio;
