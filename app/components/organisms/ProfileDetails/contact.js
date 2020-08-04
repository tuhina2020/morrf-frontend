import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import BaseIcon from 'components/atoms/BaseIcon';
import isEmpty from 'lodash/isEmpty';

const Contact = ({ data, onEdit }) => {
  const { phone, email } = data;
  return (
    <DisplayCard
      heading="Contact Information"
      topRightIcon="edit"
      onClickIcon={onEdit}
    >
      <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
        {!isEmpty(phone) && (
          <div className="W($half)">
            <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">Phone</div>
            <div className="D(f) Ai(c) Jc(fs)">
              <div className="Fz($smd) Mend($xs)">{phone.number}</div>
              {phone.verified ? (
                <BaseIcon
                  icon="checkcircle"
                  width="16px"
                  height="16px"
                  fill="#00a04a"
                />
              ) : (
                <BaseIcon
                  icon="warning"
                  width="16px"
                  height="16px"
                  fill="#ff0356"
                />
              )}
            </div>
          </div>
        )}
        <div className="W($half)">
          <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">Email id</div>
          <div className="D(f) Ai(c) Jc(fs)">
            <div className="Fz($smd) Mend($xs)">{email.id}</div>
            {email.verified ? (
              <BaseIcon
                icon="checkcircle"
                width="16px"
                height="16px"
                fill="#00a04a"
              />
            ) : (
              <BaseIcon
                icon="warning"
                width="16px"
                height="16px"
                fill="#ff0356"
              />
            )}
          </div>
        </div>
      </div>
    </DisplayCard>
  );
};

Contact.propTypes = {
  data: PropTypes.objectOf({
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  onEdit: PropTypes.func,
};

export default Contact;
