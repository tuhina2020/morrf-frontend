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
import SelectField from 'components/molecules/SelectField';

const EditAddressFormBody = ({
  currentIndex,
  line_1,
  line_2,
  city,
  state,
  pincode,
  country,
  id,
  proof_type,
  addressImages,
  files,
  proof_files,
  errors,
  touched,
  handleChange,
  field,
  form,
  setFieldValue,
  onRemove,
  removeAddress,
  uploadaddressImageData,
  removeaddressImages,
  ...address
}) => {
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;
  const options = [
    { value: 'Passport', label: 'Passport' },
    { value: 'Aadhar', label: 'Aadhar' },
    { value: 'Voter-id', label: 'Voter ID' },
  ];
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
  return (
    <div className="Pos(r) Mah($60xl) Ov(s) P($lg)">
      <div className="D(f) Ai(c) Jc(sb) Mb($md)">
        <FormikInput
          label="Address Line 1"
          name="line_1"
          id="line_1"
          dimensionClasses="W($full)"
          onChange={handleChange}
          value={line_1}
          error={getError('line_1')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl) Mb($md)">
        <FormikInput
          label="Address Line 1"
          name="line_2"
          id="line_2"
          dimensionClasses="W($full)"
          onChange={handleChange}
          value={line_2}
          error={getError('line_2')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl) My($lg)">
        <FormikInput
          label="PIN Code"
          name="pincode"
          id="pincode"
          onChange={handleChange}
          value={pincode}
          error={getError('pincode')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl)">
        <FormikInput
          name="city"
          id="city"
          label="CITY"
          onChange={handleChange}
          value={city}
          error={getError('city')}
        />
        <FormikInput
          name="state"
          id="state"
          label="STATE"
          onChange={handleChange}
          value={state}
          error={getError('state')}
        />
      </div>
      <div className="Ai(c) Jc(sb) H($3xl) My($xl) Maw($sli) Bgc(white)">
        Upload Proof
        <Field name="proof_type" component={SelectField} options={options} />
      </div>
      <div className="Fz($smx) Lh(1)">Add Files</div>
      <FileUpload
        multiple
        name="example-upload"
        maxSize={10}
        filesExisting={files}
        uploadedFiles={addressImages}
        onRemove={index => removeaddressImages({ id: address.id, index })}
        onChange={data =>
          uploadaddressImageData({ files: data, id: address.id })
        }
        showPreview
      />
      <Button {...removeProps} onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
};
const EditAddressForm = ({
  onCancel,
  data,
  onSave,
  removeAddress,
  currentIndex,
  uploadaddressImageData,
  removeaddressImages,
  addressImages,
}) => {
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
    line_1: Yup.string().required('Required'),
    line_2: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    pincode: Yup.number().required('Required'),
  });
  const initialValues = { ...data };
  const onRemove = () => {
    removeAddress(data);
    onCancel();
  };
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
            <EditAddressFormBody
              {...values}
              handleChange={handleChange}
              onRemove={onRemove}
              errors={errors}
              touched={touched}
              uploadaddressImageData={uploadaddressImageData}
              removeaddressImages={removeaddressImages}
              addressImages={addressImages}
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

EditAddressForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object,
};

EditAddressForm.defaultProps = {
  onCancel: () => {},
};

export default EditAddressForm;
