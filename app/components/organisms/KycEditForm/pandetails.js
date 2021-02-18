import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import FormikInput from 'components/molecules/FormikInput';
import { Formik, Field, Form } from 'formik';
import Select, { Option, ReactSelectProps } from 'react-select';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import { wordCount } from 'utils/helper';
import FileUpload from 'components/molecules/DragDrop/file2';
import SelectField from 'components/molecules/SelectField';

const EditPanFormBody = ({
  currentIndex,
  pancard,
  pancard_proof,
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
  uploadPanImageData,
  removePanImage,
  removePanDetails,
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
        <Field
          name="proof_type"
          id="proof_type"
          component={SelectField}
          options={options}
          onChange={handleChange}
        />
      </div>
      <div className="Fz($smx) Lh(1)">Add Files</div>
      <FileUpload
        multiple
        name="example-upload"
        maxSize={10}
        filesExisting={files}
        uploadedFiles={panImage}
        onRemove={index => removePanImage({ id: panDetails.id, index })}
        onChange={data => uploadPanImageData({ files: data })}
        showPreview
      />
      <Button {...removeProps} onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
};
const EditPanForm = ({
  onCancel,
  data,
  onSave,
  currentIndex,
  uploadPanImageData,
  removePanImage,
  panImage,
  removePanDetails,
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
    removePanDetails(data);
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
            <EditPanFormBody
              {...values}
              handleChange={handleChange}
              onRemove={onRemove}
              errors={errors}
              touched={touched}
              uploadPanImageData={uploadPanImageData}
              removePanImage={removePanImage}
              removePanDetails={removePanDetails}
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
