import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import Tag from 'components/molecules/Tag';
import isEmpty from 'lodash/isEmpty';
const Skills = ({ skills, onEdit, viewOnly }) => {
  if (isEmpty(skills)) return null;
  return (
    <DisplayCard
      heading="Skills"
      topRightIcon={!viewOnly ? 'edit' : ''}
      onClickIcon={onEdit}
      childPadding="Px($lg) Pt($sm)"
    >
      <div className="D(f) Ai(c) Jc(s) Flw(w)">
        {skills.map(
          skill =>
            skill.name && (
              <div className="Mend($sm) Mb($sm)" key={`${skill.id}`}>
                <Tag>{skill.name}</Tag>
              </div>
            ),
        )}
      </div>
    </DisplayCard>
  );
};

Skills.propTypes = {
  skills: PropTypes.array,
  onEdit: PropTypes.func,
  viewOnly: PropTypes.bool,
};

Skills.defaultProps = {
  viewOnly: false,
  onEdit: () => {},
};

export default Skills;
