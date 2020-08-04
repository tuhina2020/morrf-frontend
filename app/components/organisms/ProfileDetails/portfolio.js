import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import isEmpty from 'lodash/isEmpty';

const PortfolioDisplayCard = folioObj => {
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

const Portfolio = ({ portfolio, onEdit }) => {
  if (isEmpty(portfolio)) return null;
  return (
    <DisplayCard heading="Portfolio" topRightIcon="edit" onClickIcon={onEdit}>
      {portfolio.map(PortfolioDisplayCard)}
    </DisplayCard>
  );
};

Portfolio.propTypes = {
  portfolio: PropTypes.array,
  onEdit: PropTypes.func,
};

export default Portfolio;
