import React from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import Modal from 'react-modal';
const Skills = ({ skills }) => {
  return (
    <DisplayCard heading="Skills" topRightIcon="edit">
      <div className="Ff($ffopensans) Fz($md) Lh(1.75)">
        {JSON.stringify(skills)}
      </div>
    </DisplayCard>
  );
};

export default Skills;
