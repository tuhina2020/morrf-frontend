import React from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';

const ExperienceDisplayCard = (experienceObj, i) => {
  const { designation, company, description, from, to } = experienceObj;
  return (
    <div className="Ff($ffopensans) Fz($fzbutton) Lh(1)" key={company + from}>
      <div className="D(f) Ai(c) Jc(sb)">
        <div className="Fz($smx) Fw($fwsemibold)">{designation}</div>
        <div>
          {from} - {to}
        </div>
      </div>
      <div className="Mt($sm) Mb($mmd)">{company}</div>
      <div>{description}</div>
    </div>
  );
};

const Experience = ({ experience }) => {
  return (
    <DisplayCard heading="Experience" topRightIcon="edit">
      {sortBy(experience, 'order').map(ExperienceDisplayCard)}
    </DisplayCard>
  );
};

export default Experience;
