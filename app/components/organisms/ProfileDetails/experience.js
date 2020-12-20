import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';

const Experience = ({ data: experience, onEdit, onSave, onAdd, viewOnly }) => {
  if (isEmpty(experience)) return null;
  return (
    <DisplayCard
      heading="Experience"
      topRightIcon={!viewOnly && 'simpleadd'}
      onClickIcon={onAdd}
    >
      {experience.map(
        (
          { designation, company, highlights, startYear, endYear, present },
          i,
        ) => (
          <div
            className="Ff($ffopensans) Fz($fzbutton) Lh(1)"
            key={company + i}
          >
            <div className="D(f) Ai(c) Jc(sb)">
              <div className="Fz($smx) Fw($fwsemibold) W(66%)">
                {designation}
              </div>
              <div>
                {startYear} - {present ? 'present' : endYear}
              </div>
              {!viewOnly && (
                <BaseIcon
                  icon="edit"
                  width="28px"
                  height="28px"
                  iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs) C($inputGrey) Mstart($lg)"
                  onClick={() => onEdit(i)}
                />
              )}
            </div>
            <div className="Mt($sm) Mb($mmd)">{company}</div>
            <div className="Ff($ffopensans) Fz($md) Lh(1.75)">{highlights}</div>
          </div>
        ),
      )}
    </DisplayCard>
  );
};
Experience.propTypes = {
  experience: PropTypes.array,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
};

Experience.defaultProps = {
  viewOnly: false,
  onEdit: () => {},
  onAdd: () => {},
};

export default Experience;
