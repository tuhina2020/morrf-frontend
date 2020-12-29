import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import FormikInput from 'components/molecules/FormikInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';

const EditBankFormBody = ({
  handleChange,
  errors,
  touched,
  holderName,
  bankName,
  accountNumber,
  ifscCode,
}) => {
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;
  return (
    <div className="P($lg)">
      <div className="D(f) Ai(c) Jc(sb) H($2xl) Mb($md)">
        <FormikInput
          label="Holder Name"
          name="holderName"
          id="holderName"
          onChange={handleChange}
          value={holderName}
          error={getError('holderName')}
        />
        <FormikInput
          name="bankName"
          id="bankName"
          label="Bank Name"
          onChange={handleChange}
          value={bankName}
          error={getError('bankName')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl) Mb($md)">
        <FormikInput
          label="Account Number"
          name="accountNumber"
          id="accountNumber"
          onChange={handleChange}
          value={accountNumber}
          error={getError('accountNumber')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl)">
        <FormikInput
          name="ifscCode"
          id="ifscCode"
          label="IFSC CODE"
          onChange={handleChange}
          value={ifscCode}
          error={getError('ifscCode')}
        />
      </div>
    </div>
  );
};

const EditBankForm = ({ onCancel, data, onSave }) => {
  const saveProps = {
    iconDescription: 'Save',
    alignContent: 'center',
    kind: 'primary',
    size: 'half',
    type: 'submit',
    roundCorners: false,
  };
  const cancelProps = {
    iconDescription: 'Cancel',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'half',
    type: 'button',
    roundCorners: false,
    onClick: onCancel,
  };

  const validationSchema = Yup.object({
    holderName: Yup.string()
      .matches(/[a-zA-Z]/, 'Must be an alphabet')
      .required('Required'),
    bankName: Yup.string()
      .matches(/[a-zA-Z]/, 'Must be an alphabet')
      .required('Required'),
    accountNumber: Yup.number().required('Required'),
    ifscCode: Yup.string().required('Required'),
  });
  const initialValues = { ...data };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onSave(values);
        onCancel();
      }}
      validationSchema={validationSchema}
    >
      {({ values, handleSubmit, handleChange, errors, touched }) => (
        <div className="Bdrs($xs) Bgc(white)">
          <div className="Fz($mmd) Lh(1) Px($lg) Pb($xss) Pt($md) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
            Edit Your Details
          </div>
          <Form onSubmit={handleSubmit}>
            <EditBankFormBody
              {...values}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
            />
            <div className="D(f) Ai(c) Jc(c) Bdt($bdcardGrey)">
              <Button {...cancelProps}>Cancel</Button>
              <Button {...saveProps}>Save</Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

EditBankForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object,
};

EditBankForm.defaultProps = {
  onCancel: () => {},
};

export default EditBankForm;
