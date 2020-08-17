import React from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';

const Experience = ({ experience, onEdit, onSave, onAdd }) => {
  if (isEmpty(experience)) return null;
  return (
    <DisplayCard
      heading="Experience"
      topRightIcon="simpleadd"
      onClickIcon={onAdd}
    >
      {sortBy(experience, 'order').map(
        ({ designation, company, description, from, to, present }, i) => {
          return (
            <div
              className="Ff($ffopensans) Fz($fzbutton) Lh(1)"
              key={company + from}
            >
              <div className="D(f) Ai(c) Jc(fs)">
                <div className="Fz($smx) Fw($fwsemibold) W(69%)">
                  {designation}
                </div>
                <div>
                  {from} - {present ? 'present' : to}
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
              <div>{description}</div>
            </div>
          );
        },
      )}
    </DisplayCard>
  );
};

export default Experience;
