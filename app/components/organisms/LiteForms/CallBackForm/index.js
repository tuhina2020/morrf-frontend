import React from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button/index';
import BaseIcon from 'components/atoms/BaseIcon';

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
    <div className="W(540px) H(a) Bgc(white) Bxsh($bxshhighlight) M(a) Bdrs($xs) P($lg) O(1) Pos(r)">
      <BaseIcon
        width="24px"
        icon="arrowback"
        iconClasses="Bdrs($mmd) Bgc($navBarBg):h Pos(a) Bxz(cb) P($xss) Start($sm)"
        onClick={() => setCallBackForm(false)}
      />
      <div className="D(f) Jc(c) H($5xl) Mt($lg)">
        <div className="W($5xl) H($5xl) Bgc($inputGrey)" />
      </div>
      <div className="Ff($ffmanrope) Fz($fztitle) Ta(c) Mt($lg) Mb($2xl)">
        Request a Call Back
      </div>
      <form
        className="D(f) Fld(c) W($full) Ai(fs) Jc(fs)"
        onSubmit={handleSubmit}
      >
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($lg)"
          label="Your name"
          name="name"
          id="name"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          error={getError('name')}
        />
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($lg)"
          label="Your phone no."
          name="phone"
          id="phone"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
          error={getError('phone')}
        />
        <div className=" W($full) D(f) Jc(sb) Ai(c) Mb($lg)">
          <FormikInput
            dimensionClasses="W(218px) H($2xl)"
            label="Preffered date"
            name="date"
            id="date"
            tabIndex={1}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.date}
            error={getError('date')}
          />
          <FormikInput
            dimensionClasses="W(218px) H($2xl)"
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

        <Button classes="Mx(a) Mt($lg) Mb($2xl)" type="submit">
          Submit Request
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
    <div className="W(540px) H(a) Bxsh($bxshhighlight) M(a) Bdrs($xs) P($lg) O(1)">
      <div>
        <Button
          kind="tertiary"
          classes="Pos(a)"
          onClick={() => {
            setCallBackForm(false);
          }}
        >
          <BaseIcon icon="arrowback" width="24px" height="18px" />
        </Button>
      </div>
      <div className="D(f) Jc(c) H($5xl) Mt($lg)">
        <div className="W($5xl) H($5xl) Bgc($inputGrey)" />
      </div>
      <div className="Ff($ffmanrope) Fz($fztitle) Ta(c) Mt($lg) Mb($2xl)">
        Request a Call Back
      </div>
      <form
        className="D(f) Fld(c) W($full) Ai(fs) Jc(fs)"
        onSubmit={handleSubmit}
      >
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($lg)"
          label="Your name"
          name="name"
          id="name"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          error={getError('name')}
        />
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($lg)"
          label="Your phone no."
          name="phone"
          id="phone"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
          error={getError('phone')}
        />
        <div className=" W($full) D(f) Jc(sb) Ai(c) Mb($lg)">
          <FormikInput
            dimensionClasses="W(218px) H($2xl)"
            label="Preffered date"
            name="date"
            id="date"
            tabIndex={1}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.date}
            error={getError('date')}
          />
          <FormikInput
            dimensionClasses="W(218px) H($2xl)"
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

        <Button classes="Mx(a) Mt($lg) Mb($2xl)" type="submit">
          Submit Request
        </Button>
      </form>
    </div>
  );
};

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
