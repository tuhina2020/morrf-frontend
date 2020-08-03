import React from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../../molecules/Button/index';
import Input from '../../../molecules/Input/index';

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
      className="W(540px) H(575px) Bxsh(0px 0px 8px #0000001F)"
      style={{
        boxShadow: '0px 0px 8px #0000001f',
        margin: 'auto',
        borderRadius: '8px',
        padding: '24px',
        opacity: '1',
      }}
    >
      <div>
        <Button
          onClick={() => {
            setCallBackForm(false);
          }}
          kind="secondary"
          style={{ position: 'relative', width: '24px', height: '18px' }}
        />
      </div>
      <div style={{ height: '72px' }} />
      <div
        className="Ff($ffmanrope)"
        style={{
          fontSize: '20px',
          textAlign: 'center',
          marginTop: '24px',
          marginBottom: '48px',
        }}
      >
        Request a Call Back
      </div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ height: '72px' }}>
          <FormikInput
            dimensionClasses="W(100%) H(48px) Mb(12px)"
            label="Your name"
            name="name"
            id="name"
            tabIndex={1}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            error={getError('name')}
          />
        </div>
        <div style={{ height: '72px' }}>
          <FormikInput
            dimensionClasses="W(100%) H(48px) Mb(12px)"
            label="Your phone no."
            name="phone"
            id="phone"
            tabIndex={1}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone}
            error={getError('phone')}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          <div style={{ width: '45%' }}>
            <FormikInput
              dimensionClasses="W(100%) H(48px) Mb(12px)"
              label="Preffered date"
              name="date"
              id="date"
              tabIndex={1}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.date}
              error={getError('date')}
            />
          </div>
          <div style={{ width: '45%' }}>
            <FormikInput
              dimensionClasses="W(100%) H(48px) Mb(12px)"
              label="Preffered time"
              name="time"
              id="time"
              tabIndex={1}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.time}
              error={getError('time')}
            />
          </div>
        </div>

        <Button
          style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: '24px' }}
          type="submit"
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};

const getMobileForm = setCallBackForm => (
  <div
    className="W(540px) H(575px) Bxsh(0px 0px 8px #0000001F)"
    style={{
      boxShadow: '0px 0px 8px #0000001f',
      margin: 'auto',
      borderRadius: '8px',
      padding: '24px',
      opacity: '1',
    }}
  >
    <div>
      <Button
        onClick={() => {
          setCallBackForm(false);
        }}
        kind="secondary"
        style={{ position: 'relative', width: '24px', height: '18px' }}
      />
    </div>
    <div style={{ height: '72px' }} />
    <div
      className="Ff($ffmanrope)"
      style={{
        fontSize: '20px',
        textAlign: 'center',
        marginTop: '24px',
        marginBottom: '48px',
      }}
    >
      Request a Call Back
    </div>
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <div style={{ height: '72px' }}>
        <Input labelText="" placeholder="Your Name" size="auto" />
      </div>
      <div style={{ height: '72px' }}>
        <Input size="auto" labelText="" placeholder="Your phone no." />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        <div style={{ width: '45%' }}>
          <Input size="auto" labelText="" placeholder="Preferred date" />
        </div>
        <div style={{ width: '45%' }}>
          <Input size="auto" labelText="" placeholder="Preferred time" />
        </div>
      </div>

      <Button
        style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: '24px' }}
      >
        Submit Request
      </Button>
    </form>
  </div>
);

const CallBackForm = props => {
  const { setCallBackForm, isDesktopOrLaptop } = props;
  const YupObj = {
    name: Yup.string()
      .matches(/^([^0-9]*)$/, 'invalid')
      .required('Required'),
    phone: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    time: Yup.string().required('Required'),
  };
  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    name: '',
    phone: '',
    date: '',
    time: '',
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

CallBackForm.propTypes = {
  setCallBackForm: PropTypes.func,
  isDesktopOrLaptop: PropTypes.bool,
};

CallBackForm.defaultProps = {
  setCallBackForm: () => {},
};

export default CallBackForm;
