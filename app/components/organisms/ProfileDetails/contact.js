import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import BaseIcon from 'components/atoms/BaseIcon';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';

const Contact = ({ data, onEdit }) => {
  const { phone, email, personal } = data;
  if (isEmpty(email) && isEmpty(phone.number)) return null;
  const iconCondition =
    phone.verified &&
    !isNull(phone.verified) &&
    !isEmpty(phone.number) &&
    !isNull(phone.number);
  return (
    <DisplayCard
      heading="Contact Information"
      topRightIcon="edit"
      onClickIcon={onEdit}
      wrapperClassName={isEmpty(personal) ? '' : undefined}
    >
      <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
        {!isEmpty(phone) && !isEmpty(phone.number) && !isNull(phone.number) && (
          <div className="W($half)">
            <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">Phone</div>
            <div className="D(f) Ai(c) Jc(fs)">
              <div className="Fz($smd) Mend($xs)">{phone.number}</div>
              <BaseIcon
                icon={iconCondition ? 'checkcircle' : 'warning'}
                width="16px"
                height="16px"
                fill={iconCondition ? '#00a04a' : '#ff0356'}
              />
            </div>
          </div>
        )}
        <div className="W($half)">
          <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">Email id</div>
          <div className="D(f) Ai(c) Jc(fs)">
            <div className="Fz($smd) Mend($xs)">{email}</div>
            <BaseIcon
              icon="checkcircle"
              width="16px"
              height="16px"
              fill="#00a04a"
            />
          </div>
        </div>
      </div>
    </DisplayCard>
  );
};

Contact.propTypes = {
  data: PropTypes.object,
  onEdit: PropTypes.func,
};

export default Contact;
