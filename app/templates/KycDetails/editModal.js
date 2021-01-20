import React from 'react';
import PropTypes from 'prop-types';
import EditBankForm from 'components/organisms/KycEditForm/bankdetails';
import EditAddressForm from 'components/organisms/KycEditForm/address';
const EditFormModal = ({ data, onSave, onCancel, open, ...extraProps }) => {
  const props = {
    ...extraProps,
    onSave,
    onCancel,
    data,
  };
  switch (open) {
    case 'bankDetailss':
    case 'editbankDetails':
      return <EditBankForm {...props} />;
    case 'address':
    case 'editAddress':
      return <EditAddressForm {...props} />;
    default:
      return null;
  }
};

EditFormModal.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.string,
};

export default EditFormModal;
