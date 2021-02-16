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
import SelectField from './Selectfield';

const EditPanFormBody = ({
  currentIndex,
  pancard,
  panImage,
  id,
  files,
  errors,
  touched,
  handleChange,
  field,
  form,
  setFieldValue,
  onRemove,
  removePan,
  uploadPanImageData,
  removePanImage,
  ...panDetails
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
          label="PAN Number"
          name="pancard"
          id="pancard"
          dimensionClasses="W($full)"
          onChange={handleChange}
          value={pancard}
          error={getError('pancard')}
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
        maxSize={1}
        filesExisting={files}
        uploadedFiles={panImage}
        onRemove={index => removePanImage({ id: panDetails.id, index })}
        onChange={data =>
          uploadPanImageData({ files: data, id: panDetails.id })
        }
        showPreview
      />
      <Button {...removeProps} onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
};
debugger;
const EditPanForm = ({
  onCancel,
  data,
  onSave,
  removePan,
  currentIndex,
  uploadPanImageData,
  removePanImage,
  panImage,
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
    pancard: Yup.string().required('Required'),
  });
  const initialValues = { ...data };
  const onRemove = () => {
    removePan(data);
    onCancel();
  };
  debugger;
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
            <EditPanFormBody
              {...values}
              handleChange={handleChange}
              onRemove={onRemove}
              errors={errors}
              touched={touched}
              uploadPanImageData={uploadPanImageData}
              removePanImage={removePanImage}
              panImage={panImage}
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

EditPanForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object,
};

EditPanForm.defaultProps = {
  onCancel: () => {},
};

export default EditPanForm;
