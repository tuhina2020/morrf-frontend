import React, { useState } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import Tag from 'components/molecules/Tag';
import isEmpty from 'lodash/isEmpty';
const Skills = ({ skills, onEdit }) => {
  return (
    <DisplayCard heading="Skills" topRightIcon="edit" onClickIcon={onEdit}>
      <div className="D(f) Ai(c) Jc(s) Flw(w)">
        {skills.map(skill => {
          return (
            <div className="Mend($sm) Mb($sm)" key={`${skill.id}`}>
              <Tag disabled={true}>{skill.name}</Tag>
            </div>
          );
        })}
      </div>
    </DisplayCard>
  );
};

export default Skills;
