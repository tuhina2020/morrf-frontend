import React, { useState } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import Tag from 'components/molecules/Tag';
import isEmpty from 'lodash/isEmpty';
const Skills = ({ skills, onEdit }) => (
  <DisplayCard heading="Skills" topRightIcon="edit" onClickIcon={onEdit}>
    <div className="D(f) Ai(c) Jc(s) Flw(w)">
      {skills.map(skill => (
        <div className="Mend($sm) Mb($sm)" key={`${skill.id}`}>
          <Tag disabled>{skill.name}</Tag>
        </div>
      ))}
    </div>
  </DisplayCard>
);

export default Skills;
