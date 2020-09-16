import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';

const Experience = ({ data, experience, onEdit, onSave, onAdd }) => {
  if (isEmpty(experience)) return null;
  return (
    <DisplayCard
      heading="Experience"
      topRightIcon="simpleadd"
      onClickIcon={onAdd}
    >
      {sortBy(experience, 'order').map(
        (
          { designation, company, highlights, startYear, endYear, present },
          i,
        ) => {
          return (
            <div
              className="Ff($ffopensans) Fz($fzbutton) Lh(1)"
              key={company + startYear}
            >
              <div className="D(f) Ai(c) Jc(sb)">
                <div className="Fz($smx) Fw($fwsemibold) W(66%)">
                  {designation}
                </div>
                <div>
                  {startYear} - {present ? 'present' : endYear}
                </div>
                <BaseIcon
                  icon="edit"
                  width="28px"
                  height="28px"
                  iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs) C($inputGrey) Mstart($lg)"
                  onClick={() => onEdit(i)}
                />
              </div>
              <div className="Mt($sm) Mb($mmd)">{company}</div>
              <div>{highlights}</div>
            </div>
          );
        },
      )}
    </DisplayCard>
  );
};
Experience.propTypes = {
  experience: PropTypes.array,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
};

export default Experience;
