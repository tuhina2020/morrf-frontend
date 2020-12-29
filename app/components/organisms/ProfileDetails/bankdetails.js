import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import BaseIcon from 'components/atoms/BaseIcon';

const BankDetails = ({ bankDetails, onAdd, onEdit, viewOnly }) => {
  const { holderName, bankName, accountNumber, ifscCode } = bankDetails;
  if (isEmpty(bankDetails)) {
    return (
      <div>
        <DisplayCard
          heading="Bank Details"
          topRightIcon={!viewOnly && 'simpleadd'}
          onClickIcon={onAdd}
        >
          <div> Nothing </div>
        </DisplayCard>
      </div>
    );
  }
  return (
    <div>
      <DisplayCard
        heading="Bank Details"
        topRightIcon={!viewOnly && 'simpleadd'}
        onClickIcon={onAdd}
      >
        <div> {holderName} </div>
        <div> {bankName} </div>
        <div> {accountNumber} </div>
        <div> {ifscCode} </div>
      </DisplayCard>
    </div>
  );
};

BankDetails.propTypes = {
  bankDetails: PropTypes.object,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  viewOnly: PropTypes.func,
};

BankDetails.defaultProps = {
  viewOnly: false,
  onAdd: () => {},
};
export default BankDetails;
