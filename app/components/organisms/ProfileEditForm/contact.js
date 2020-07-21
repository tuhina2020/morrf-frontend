import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditCard from 'components/organisms/EditCard';
import DisplayCard from 'components/molecules/DisplayCard';
import Input from 'components/molecules/Input';
import FormikInput from 'components/molecules/FormikInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';

const ContactEditForm = ({ onCancel, phone, email }) => {
  const Formik = useFormik({
    initialValues: {
      phone: phone.number,
      email: email.id,
      code: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/[0-9]/, 'Only digits allowed')
        .length(10, 'Enter a 10 digit phone number')
        .required('Required'),
      email: Yup.string()
        .min(4, 'Enter atleast four characters')
        .email('Enter a valid email')
        .required('Required'),
      code: Yup.string()
        .min(4, 'Minimum 4 characters long')
        .required('Required'),
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

  const verifyPhoneButtton = {
    iconDescription: 'Send verification code',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'fc',
    // tabIndex: 3,
    onClick: () => {
      console.log('send code');
    },
  };

  return (
    <form noValidate onSubmit={Formik.handleSubmit}>
      <DisplayCard
        heading={'Edit Contact Information'}
        lastChildPadding={false}
        // childPadding="Px($lg) Py($md)"
        childPadding="Px($lg) Pb($lmg) Pt($md)"
      >
        <div>
          <div className="D(f) Ai(c) Jc(sb) H($2xl)">
            <FormikInput
              label="Phone"
              name="phone"
              id="phone"
              tabIndex={1}
              onChange={Formik.handleChange}
              value={Formik.values.phone}
              error={getError('phone')}
            />
            <FormikInput
              name="email"
              id="email"
              disabled={true}
              label="Email ID"
              tabIndex={2}
              onChange={Formik.handleChange}
              value={Formik.values.email}
              error={getError('email')}
            />
          </div>
          {!phone.verified && (
            <div className="Mt($sm) D(f) Jc(s) Ai(c)">
              <FormikInput
                label="Verification Code"
                name="code"
                id="code"
                tabIndex={3}
                dimensionClasses="W($20xl)"
                onChange={Formik.handleChange}
                value={Formik.values.code}
                error={getError('code')}
              />
              <div className="Mt($sm) Mstart($xss)">
                <Button {...verifyPhoneButtton}>Send verification code</Button>
              </div>
            </div>
          )}
        </div>
        <div className="D(f) Ai(c) Jc(c)">
          <Button {...cancelProps}>Cancel</Button>
          <Button {...saveProps}>Save</Button>
        </div>
      </DisplayCard>
    </form>
  );
};

ContactEditForm.propTypes = {
  onCancel: PropTypes.func,
  phone: PropTypes.object,
  email: PropTypes.object,
};

ContactEditForm.defaultProps = {
  onCancel: () => {},
  phone: { number: '', verified: false },
  email: { id: '', verified: false },
};

export default ContactEditForm;
