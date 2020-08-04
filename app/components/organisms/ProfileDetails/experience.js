import React from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';

const ExperienceDisplayCard = (
  { designation, company, description, from, to, present },
  i,
) => {
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

const Experience = ({ experience, onEdit, onSave }) => {
  if (isEmpty(experience)) return null;
  return (
    <DisplayCard heading="Experience" topRightIcon="edit" onClickIcon={onEdit}>
      {sortBy(experience, 'order').map(ExperienceDisplayCard)}
    </DisplayCard>
  );
};

export default Experience;
