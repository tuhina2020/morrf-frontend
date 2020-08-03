import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import FormikInput from 'components/molecules/FormikInput';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { Form, Formik } from 'formik';
import Input from '../../../molecules/Input/index';

import Button from '../../../molecules/Button/index';
const getDesktopForm = setCallBackForm => ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  validateField,
  validateForm,
  setFieldError,
}) => {
  const getError = key => (key && errors[key] ? errors[key] : null);

  return (
    <div
      className="W(540px) H(575px) D(f) Ai(c) Jc(c) Bxsh(0px 0px 8px #0000001F)"
      style={{
        boxShadow: '0px 0px 8px #0000001f',
        margin: 'auto',
        borderRadius: '8px',
        padding: '24px',
        paddingTop: '0px',
        opacity: '1',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
        }}
        onSubmit={handleSubmit}
      >
        <FormikInput
          dimensionClasses="W(100%) H(60px)"
          label="Your name"
          name="name"
          id="name"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          error={getError('phone')}
        />
        <FormikInput
          dimensionClasses="W(100%) H(60px) Mb(12px)"
          label="Design specialist you are looking for"
          name="specialist"
          id="specialist"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.specialist}
          error={getError('specialist')}
        />
        <FormikTextArea
          dimensionClasses="W(100%) H(100px) Mt(12px)"
          heightClass="H(100px)"
          placeholder="Brief description of the job"
          name="description"
          id="description"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.description}
          error={getError('description')}
        />
        <FormikInput
          dimensionClasses="W(100%) H(60px)"
          label="Job budget in INR"
          name="budget"
          id="budget"
          tabIndex={1}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.budget}
          error={getError('budget')}
        />
        <FormikInput
          dimensionClasses="W(100%) H(60px)"
          label="Your email address"
          name="email"
          id="email"
          tabIndex={1}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={getError('email')}
        />

        <Button
          type="submit"
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '24px',
            marginBottom: '12px',
          }}
        >
          Submit Request
        </Button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '254px',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '12px',
            marginBottom: '12px',
          }}
        >
          <hr
            width="40%"
            style={{
              opacity: '0.5',
            }}
          />
          or
          <hr
            width="40%"
            style={{
              opacity: '0.5',
            }}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            setCallBackForm(true);
          }}
          kind="secondary"
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '12px',
          }}
        >
          Request a Callback
        </Button>
      </form>
    </div>
  );
};

const getMobileForm = setCallBackForm => ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  validateField,
  validateForm,
  setFieldError,
}) => {
  const getError = key => (key && errors[key] ? errors[key] : null);

  return (
    <div
      className="W(540px) H(575px) D(f) Ai(c) Jc(c) Bxsh(0px 0px 8px #0000001F)"
      style={{
        boxShadow: '0px 0px 8px #0000001f',
        margin: 'auto',
        borderRadius: '8px',
        padding: '24px',
        paddingTop: '0px',
        opacity: '1',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <FormikInput
          dimensionClasses="W(100%) H(48px) Mb(12px)"
          label="Your name"
          name="name"
          id="name"
          tabIndex={1}
          onChange={handleChange}
          value={values.name}
          error={getError('phone')}
        />
        <FormikInput
          dimensionClasses="W(100%) H(60px) "
          label="Design specialist you are looking for"
          name="specialist"
          id="specialist"
          tabIndex={1}
          onChange={handleChange}
          value={values.specialist}
          error={getError('specialist')}
        />
        <FormikTextArea
          dimensionClasses="W(100%) H(100px) "
          heightClass="H(100px)"
          placeholder="Brief description of the job"
          name="description"
          id="description"
          tabIndex={1}
          onChange={handleChange}
          value={values.description}
          error={getError('description')}
        />
        <FormikInput
          dimensionClasses="W(100%) H(48px) Mb(12px)"
          label="Job budget in INR"
          name="budget"
          id="budget"
          tabIndex={1}
          onChange={handleChange}
          value={values.budget}
          error={getError('budget')}
        />
        <FormikInput
          dimensionClasses="W(100%) H(48px) Mb(12px)"
          label="Your email address"
          name="email"
          id="email"
          tabIndex={1}
          onChange={handleChange}
          value={values.email}
          error={getError('email')}
        />
        <Button
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '24px',
            marginBottom: '12px',
          }}
        >
          Submit Request
        </Button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '254px',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '12px',
            marginBottom: '12px',
          }}
        >
          <hr
            width="40%"
            style={{
              opacity: '0.5',
            }}
          />
          or
          <hr
            width="40%"
            style={{
              opacity: '0.5',
            }}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            setCallBackForm(true);
          }}
          kind="secondary"
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '12px',
          }}
        >
          Request a Callback
        </Button>
      </form>
    </div>
  );
};

const RequestForm = props => {
  const { setCallBackForm, isDesktopOrLaptop } = props;
  const YupObj = {
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Required'),
    specialist: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    budget: Yup.number()
      .integer('Enter amount')
      .required('Required'),
  };
  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    name: '',
    specialist: '',
    description: '',
    budget: '',
    email: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        alert(JSON.stringify(values));
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {isDesktopOrLaptop
        ? getDesktopForm(setCallBackForm)
        : getMobileForm(setCallBackForm)}
    </Formik>
  );
};

RequestForm.propTypes = {
  setCallBackForm: PropTypes.func,
  isDesktopOrLaptop: PropTypes.bool,
};

RequestForm.defaultProps = {
  isDesktopOrLaptop: true,
  setCallBackForm: () => {},
};

export default RequestForm;
