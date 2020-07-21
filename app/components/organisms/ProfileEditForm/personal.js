import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditCard from 'components/organisms/EditCard';
import DisplayCard from 'components/molecules/DisplayCard';
import Input from 'components/molecules/Input';
import FormikInput from 'components/molecules/FormikInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';

const EditPersonalForm = ({
  onCancel,
  city,
  state,
  profession,
  firstName,
  lastName,
}) => {
  const Formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      profession,
      city,
      state,
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/[a-zA-Z]/, 'Must be an alphabet')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .matches(/[a-zA-Z]/, 'Must be an alphabet')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      profession: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
    }),
  });

  const getError = key =>
    key && Formik.errors[key] && Formik.touched[key]
      ? Formik.errors[key]
      : null;

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
    type: 'reset',
    roundCorners: false,
    onClick: onCancel,
  };

  return (
    <form noValidate onSubmit={Formik.handleSubmit}>
      <DisplayCard
        heading={'Edit My Details'}
        lastChildPadding={false}
        childPadding="Px($lg) Pb($xl) Pt($md)"
      >
        <div className="D(f) Ai(c) Jc(sb) H($2xl)">
          <FormikInput
            label="First Name"
            name="firstName"
            id="firstName"
            tabIndex={1}
            onChange={Formik.handleChange}
            value={Formik.values.firstName}
            error={getError('firstName')}
          />
          <FormikInput
            name="lastName"
            id="lastName"
            label="Last Name"
            tabIndex={2}
            onChange={Formik.handleChange}
            value={Formik.values.lastName}
            error={getError('lastName')}
          />
        </div>
        <div className="D(f) Ai(c) Jc(sb) H($2xl)">
          <FormikInput
            label="Profession"
            name="profession"
            id="profession"
            tabIndex={3}
            onChange={Formik.handleChange}
            value={Formik.values.profession}
            error={getError('profession')}
          />
        </div>
        <div className="D(f) Ai(c) Jc(sb) H($2xl)">
          <FormikInput
            label="City / Town"
            name="city"
            id="city"
            tabIndex={4}
            onChange={Formik.handleChange}
            value={Formik.values.city}
            error={getError('city')}
          />
          <FormikInput
            name="state"
            id="state"
            label="State"
            tabIndex={5}
            onChange={Formik.handleChange}
            value={Formik.values.state}
            error={getError('state')}
          />
        </div>
        <div className="D(f) Ai(c) Jc(c)">
          <Button {...cancelProps}>Cancel</Button>
          <Button {...saveProps}>Save</Button>
        </div>
      </DisplayCard>
    </form>
  );
};

EditPersonalForm.propTypes = {
  onCancel: PropTypes.func,
  city: PropTypes.string,
  state: PropTypes.string,
  profession: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

EditPersonalForm.defaultProps = {
  onCancel: () => {},
  city: '',
  state: '',
  profession: '',
  firstName: '',
  lastName: '',
};

export default EditPersonalForm;
