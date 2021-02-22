import React from 'react';
import PropTypes from 'prop-types';
import EditBankForm from 'components/organisms/KycEditForm/bankdetails';
import EditAddressForm from 'components/organisms/KycEditForm/address';
import EditPanForm from 'components/organisms/KycEditForm/pandetails';
import EditSignatureForm from 'components/organisms/KycEditForm/signature';
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
    case 'panDetails':
    case 'editpanDetails':
      return <EditPanForm {...props} />;
    case 'signature':
    case 'editSignature':
      return <EditSignatureForm {...props} />;
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
