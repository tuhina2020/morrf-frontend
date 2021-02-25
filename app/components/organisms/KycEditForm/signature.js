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

const EditSignatureFormBody = ({
  currentIndex,
  signatureImage,
  id,
  files,
  errors,
  touched,
  handleChange,
  field,
  values,
  form,
  setFieldValue,
  removeSignature,
  uploadSignatureImageData,
  removeSignatureImage,
  signature
}) => {
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;
  return (
    <div className="Pos(r) Mah($60xl) Ov(s) P($lg)">
      <div className="Fz($smx) Lh(1)">Add Files</div>
      <FileUpload
        multiple
        name="example-upload"
        maxSize={1}
        filesExisting={signatureImage}
        uploadedFiles={signatureImage}
        onRemove={index => removeSignatureImage({ files, index })}
        onChange={data => uploadSignatureImageData({ files: data })}
        showPreview
      />
    </div>
  );
};
debugger;
const EditSignatureForm = ({
  onCancel,
  data,
  onSave,
  currentIndex,
  uploadSignatureImageData,
  removeSignatureImage,
  signatureImage,
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

  const initialValues = { ...data };
  debugger;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onSave(values);
        onCancel();
      }}
    >
      {({ values, handleSubmit, handleChange, errors, touched }) => (
        <div className="Bdrs($xs) Bgc(white)">
          <div className="Fz($mmd) Lh(1) Px($lg) Pb($xss) Pt($md) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
            Edit Your Details
          </div>
          <Form onSubmit={handleSubmit}>
            <EditSignatureFormBody
              {...values}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
              uploadSignatureImageData={uploadSignatureImageData}
              removeSignatureImage={removeSignatureImage}
              signatureImage={signatureImage}
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

EditSignatureForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object,
};

EditSignatureForm.defaultProps = {
  onCancel: () => {},
};

export default EditSignatureForm;
