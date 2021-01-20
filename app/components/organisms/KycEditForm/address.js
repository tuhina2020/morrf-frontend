import React, { useCallback, useEffect } from 'react';
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
import SelectField from './Selectfield';

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

const EditAdressFormBody = ({
  currentIndex,
  line_1,
  line_2,
  city,
  state,
  pincode,
  country,
  proof_type,
  errors,
  touched,
  handleChange,
  handleSubmit,
  field,
  form,
  values,
  setFieldValue,
  onRemove,
  removeAddress,
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
      <div className="D(f) Ai(c) Jc(sb) H($2xl) Mb($md)">
        <FormikInput
          label="Address line 1"
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
          name="line_2"
          id="line_2"
          label="Address line2"
          dimensionClasses="W($full)"
          onChange={handleChange}
          value={line_2}
          error={getError('line_2')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl) Mb($md)">
        <FormikInput
          name="pincode"
          id="pincode"
          label="PIN CODE"
          onChange={handleChange}
          value={pincode}
          error={getError('pincode')}
        />
      </div>
      <div className="D(f) Ai(c) Jc(sb) H($2xl)">
        <FormikInput
          label="CITY "
          name="city"
          id="city"
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
      {address && address.id ? (
        <Button {...removeProps} onClick={onRemove}>
          Remove
        </Button>
      ) : null}
    </div>
  );
};

const EditAddressForm = ({ onCancel, data, onSave, removeAddress }) => {
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
    pincode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
  });
  const initialValues = { ...data };
  const onRemove = () => {
    removeAddress(data);
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
            <EditAdressFormBody
              {...values}
              handleChange={handleChange}
              onRemove={onRemove}
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

EditAddressForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object,
};

EditAddressForm.defaultProps = {
  onCancel: () => {},
  data: {},
};

export default EditAddressForm;
