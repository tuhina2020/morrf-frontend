import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import FormikInput from 'components/molecules/FormikInput';
import { Formik, FieldArray, Form, Field, FieldProps } from 'formik';
import Select, { Option, ReactSelectProps } from 'react-select';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import { wordCount } from 'utils/helper';
import FileUpload from 'components/molecules/DragDrop/file2';
import { values } from 'lodash';
import SelectField from 'components/molecules/SelectField';

const EditBankFormBody = ({
  currentIndex,
  errors,
  className,
  touched,
  handleChange,
  handleSubmit,
  values,
  field,
  form,
  setFieldValue,
  onRemove,
  onCancel,
  uploadBankImageData,
  bankImages,
  removeBankImages,
  holder_name,
  bank_name,
  account_number,
  ifsc_code,
  upi_code,
  files,
  ...bankDetailss
}) => {
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;
  const removeProps = {
    iconDescription: 'Remove',
    alignContent: 'center',
    kind: 'danger',
    size: '10x',
    type: 'button',
    height: 'H($lg)',
    roundCorners: false,
    postIcon: 'remove',
  };
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div className="Pos(r) Mah($60xl) Ov(s) P($lg)">
      <div className="D(f) Ai(c) Jc(sb) Mb($md)">
        <FormikInput
          label="Holder Name as per Bank Account"
          name="holder_name"
          id="holder_name"
          dimensionClasses="W($full)"
          onChange={handleChange}
          value={holder_name}
          error={getError('holder_name')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl) Mb($md)">
        <FormikInput
          label="Account Number"
          name="account_number"
          id="account_number"
          dimensionClasses="W($full)"
          onChange={handleChange}
          value={account_number}
          error={getError('account_number')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl)">
        <FormikInput
          name="ifsc_code"
          id="ifsc_code"
          label="IFSC CODE"
          onChange={handleChange}
          value={ifsc_code}
          error={getError('ifsc_code')}
        />
        <FormikInput
          name="bank_name"
          id="bank_name"
          label="Bank Name"
          onChange={handleChange}
          value={bank_name}
          error={getError('bank_name')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl) My($lg)">
        <FormikInput
          label="UPI Code optional"
          name="upi_code"
          id="upi_code"
          onChange={handleChange}
          value={upi_code}
          error={getError('upi_code')}
        />
      </div>
      <div className="Ai(c) Jc(sb) H($3xl) My($xl) Maw($sli) Bgc(white)">
        Upload Proof
        <Field name="bank_name" component={SelectField} options={options} />
      </div>
      <div className="Fz($smx) Lh(1)">Add Files</div>
      <FileUpload
        multiple
        name="example-upload"
        maxSize={10}
        filesExisting={files}
        uploadedFiles={bankImages}
        onRemove={index => removeBankImages({ id: bankDetailss.id, index })}
        onChange={data =>
          uploadBankImageData({ files: data, id: bankDetailss.id })
        }
        showPreview
      />
      {bankDetailss && bankDetailss.id ? (
        <Button {...removeProps} onClick={onRemove}>
          Remove
        </Button>
      ) : null}
    </div>
  );
};

const EditBankForm = ({
  onCancel,
  data: bankDetailss,
  onSave,
  currentIndex,
  removeBankDetails,
  uploadBankImageData,
  removeBankImages,
  bankImages,
}) => {
  const validationSchema = Yup.object({
    holder_name: Yup.string()
      .matches(/[a-zA-Z]/, 'Must be an alphabet')
      .required('Required'),
    bank_name: Yup.string()
      .matches(/[a-zA-Z]/, 'Must be an alphabet')
      .required('Required'),
    account_number: Yup.number().required('Required'),
    ifsc_code: Yup.string().required('Required'),
  });
  const emptybankDetails = {
    holder_name: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    upi_code: '',
    images: [],
  };
  const initialValues =
    currentIndex === 0 || currentIndex
      ? bankDetailss[currentIndex]
      : emptybankDetails;
  const onRemove = () => {
    if (currentIndex >= 0) {
      const newbankDetails = bankDetailss.filter(
        (obj, i) => i === currentIndex,
      )[0];
      removeBankDetails(newbankDetails);
      onCancel();
    }
  };

  const imageUploadSuccess = isEmpty(bankImages)
    ? false
    : bankImages.reduce((acc, cur) => {
        const success = !isEmpty(cur.id);
        return acc && success;
      }, true);

  const activeSaveProps = {
    iconDescription: 'Save',
    alignContent: 'center',
    kind: 'primary',
    size: 'half',
    type: 'submit',
    roundCorners: false,
    // disabled: !imageUploadSuccess,
  };

  const onCancelHandler = ({ values, mode }) => () => {
    const index = currentIndex >= 0 ? currentIndex : bankDetailss.length;
    const newbankDetails = [...bankDetailss];
    newbankDetails[index] = {
      ...values,
      mode: values.mode === 'completed' ? 'completed' : mode,
    };
    // alert(values);
    onSave({ bankDetailss: newbankDetails[index], newbankDetails });
    onCancel();
  };

  const cancelProps = {
    iconDescription: 'Cancel',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'half',
    type: 'button',
    roundCorners: false,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        onCancelHandler({ values, mode: 'completed' })();
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        touched,
        errors,
        setFieldValue,
      }) => (
        <div className="Bdrs($xs) Bgc(white)">
          <Form onSubmit={handleSubmit}>
            <>
              <div className="Fz($mmd) Lh(1) Px($lg) Pb($xss) Pt($md) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
                Edit Bank Details
              </div>
              <EditBankFormBody
                {...values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                onRemove={onRemove}
                onCancel={onCancel}
                uploadBankImageData={uploadBankImageData}
                removeBankImages={removeBankImages}
                bankImages={bankImages}
              />
              <div className="D(f) Ai(c) Jc(c) Bdt($bdcardGrey)">
                <Button {...cancelProps} onClick={onCancel}>
                  Cancel
                </Button>
                <Button {...activeSaveProps}>Save</Button>
              </div>
            </>
          </Form>
        </div>
      )}
    </Formik>
  );
};

EditBankForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.array,
};

EditBankForm.defaultProps = {
  onCancel: () => {},
  data: [],
};

export default EditBankForm;
