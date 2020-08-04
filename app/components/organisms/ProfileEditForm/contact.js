import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import FormikInput from 'components/molecules/FormikInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash/isEmpty';
const ContactFormComponent = ({ onCancel, onSendCode }) => ({
  handleSubmit,
  handleChange,
  values,
  errors,
  validateForm,
  setFieldError,
}) => {
  const onSendCodeClick = () =>
    validateForm().then(data => {
      setFieldError('code', null);
      if (isEmpty(data.phone)) onSendCode({ phone: values.phone });
    });
  const getError = key => (key && errors[key] ? errors[key] : null);

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

  const sendCodeButton = {
    iconDescription: 'Send verification code',
    alignContent: 'center',
    kind: 'tertiary',
    type: 'button',
    size: 'fc',
  };
  return (
    <form onSubmit={handleSubmit}>
      <DisplayCard
        heading="Edit Contact Information"
        lastChildPadding={false}
        // childPadding="Px($lg) Py($md)"
        childPadding="P($lg)"
      >
        <div>
          <div className="D(f) Ai(c) Jc(sb) H($2xl)">
            <FormikInput
              label="Phone"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={values.phone}
              error={getError('phone')}
            />
            <FormikInput
              name="email"
              id="email"
              disabled
              label="Email ID"
              onChange={handleChange}
              value={values.email}
              error={getError('email')}
            />
          </div>
          {!phone.verified && (
            <div className="D(f) Jc(s) Ai(c) H($2xl) Mt($lg)">
              <FormikInput
                label="Verification Code"
                name="code"
                id="code"
                dimensionClasses="W($20xl)"
                onChange={handleChange}
                value={values.code}
                // validate={validateCode}
                error={getError('code')}
              />
              <div className="Mt($sm) Mstart($xss)">
                <Button {...sendCodeButton} onClick={onSendCodeClick}>
                  Send verification code
                </Button>
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

const ContactEditForm = ({ onCancel, data, onSave, onSendCode }) => {
  const { phone, email } = data;
  const YupObj = {
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
  };
  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    phone: phone.number || '',
    email: email.id,
    code: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        console.log(onSave);
        alert(JSON.stringify(values));
        onSave({ phone: values.phone, code: values.code });
        setSubmitting(false);
        onCancel();
      }}
      validationSchema={validationSchema}
    >
      {ContactFormComponent({
        onCancel,
        phone,
        email,
        onSave,
        onSendCode,
      })}
    </Formik>
  );
};

ContactEditForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.array,
  onSendCode: PropTypes.func,
};

ContactEditForm.defaultProps = {
  onCancel: () => {},
  data: {},
};

export default ContactEditForm;
