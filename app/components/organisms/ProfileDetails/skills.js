import React, { useState, useEffect } from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import Tag from 'components/molecules/Tag';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
const Skills = ({ skills, onEdit }) => {
  const [localSkills, setSkills] = useState(skills);
  if (isEmpty(skills)) return null;
  useEffect(() => {
    if (!isEqual(skills, localSkills)) setSkills(skills);
  }, [skills]);
  return (
    <DisplayCard heading="Skills" topRightIcon="edit" onClickIcon={onEdit}>
      <div className="D(f) Ai(c) Jc(s) Flw(w)">
        {localSkills.map(skill => (
          <div className="Mend($sm) Mb($sm)" key={`${skill.id}`}>
            <Tag disabled>{skill.name}</Tag>
          </div>
        ))}
      </div>
    </DisplayCard>
  );
};

export default Skills;
