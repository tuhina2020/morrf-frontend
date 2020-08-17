import React from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import FormikCalendar from 'components/molecules/Calendar';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button/index';
import BaseIcon from 'components/atoms/BaseIcon';

const generateMorffLiteForm = ({
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
  setCallToggle,
  setFieldValue,
  isDesktopOrLaptop,
}) => {
  const submitProps = {
    iconDescription: 'submit',
    alignContent: 'center',
    kind: 'primary',
    type: 'submit',
  };
  const dimensionClasses = 'Mb($lg) W($full)';
  const dateDimensionClasses = isDesktopOrLaptop
    ? 'Mb($lg) W(217px) Mend($2xl)'
    : 'Mb($lg) W(265px)';
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;
  console.log(values.date, 'THIS IS DATE');
  return (
    <form onSubmit={handleSubmit}>
      <FormikInput
        dimensionClasses={dimensionClasses}
        label="Your name"
        name="name"
        id="name"
        onChange={handleChange}
        value={values.name}
        error={getError('name')}
      />
      <FormikInput
        dimensionClasses={dimensionClasses}
        label="Your phone no."
        name="phone"
        id="phone"
        onChange={handleChange}
        value={values.phone}
        error={getError('phone')}
      />
      <div
        className={isDesktopOrLaptop ? 'D(f) Jc(sb) Ai(c)' : dimensionClasses}
      >
        <FormikCalendar
          label="Preferred date"
          name="date"
          id="date"
          dimensionClasses={dateDimensionClasses}
          onChange={handleChange}
          value={values.date}
          error={getError('date')}
          setUpstreamDate={val => {
            setFieldValue('date', new Date(val).toDateString());
          }}
        />
        <FormikInput
          label="Preferred time"
          name="time"
          id="time"
          dimensionClasses={dimensionClasses}
          onChange={handleChange}
          value={values.time}
          error={getError('time')}
        />
      </div>
      <div
        className={`Mx(a) W(fc) ${isDesktopOrLaptop ? 'Mt($2xl) Mb($lg)' : ''}`}
      >
        <Button {...submitProps}>Submit Request</Button>
      </div>
    </form>
  );
};

// const getMobileForm = setCallToggle => ({
//   handleSubmit,
//   handleChange,
//   handleBlur,
//   values,
//   touched,
//   errors,
//   validateField,
//   validateForm,
//   setFieldError,
// }) => {
//   const getError = key => (key && errors[key] ? errors[key] : null);
//   return (
//     <Form
//       className="D(f) Fld(c) W($full) Ai(fs) Jc(fs)"
//       onSubmit={handleSubmit}
//     >
//       <FormikInput
//         dimensionClasses="W($full) H($2xl) Mb($lg)"
//         label="Your name"
//         name="name"
//         id="name"
//         onChange={handleChange}
//         value={values.name}
//         error={getError('name')}
//       />
//       <FormikInput
//         dimensionClasses="W($full) H($2xl) Mb($lg)"
//         label="Your phone no."
//         name="phone"
//         id="phone"
//         onChange={handleChange}
//         value={values.phone}
//         error={getError('phone')}
//       />
//       <FormikInput
//         dimensionClasses="W($full) H($2xl) Mb($lg)"
//         label="Preffered date"
//         name="date"
//         id="date"
//         onChange={handleChange}
//         value={values.date}
//         error={getError('date')}
//       />
//       <FormikInput
//         dimensionClasses="W($full) H($2xl) Mb($lg)"
//         label="Preffered time"
//         name="time"
//         id="time"
//         onChange={handleChange}
//         value={values.time}
//         error={getError('time')}
//       />

//       <Button classes="Mx(a) Mt=b($lg)" type="submit">
//         Submit Request
//       </Button>
//     </Form>
//   );
// };

const CallBackForm = props => {
  const { setCallToggle, isDesktopOrLaptop, callbackReq, success } = props;
  const YupObj = {
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Numbers not allowed')
      .min(3, 'Enter atleast 3 letters')
      .required('Required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Enter valid phone number')
      .required('Required'),
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
    <div
      className={`${
        isDesktopOrLaptop ? 'W(530px)' : 'W(320px)'
      } H(a) Bgc(white) Bxsh($bxshhighlight) M(a) Bdrs($xs) P($lg) O(1) Pos(r)`}
    >
      <BaseIcon
        icon="arrowback"
        iconClasses="Bdrs($mmd) W($lg) H($lg) Bgc($navBarBg):h Pos(a) Bxz(cb) P($xss) Start($sm)"
        onClick={() => setCallToggle(false)}
      />
      <div className="W($5xl) H($5xl) Bgc($inputGrey) Mt($lg) Mx(a)" />
      <div className="Ff($ffmanrope) Fz($fztitle) Ta(c) Mt($lg) Mb($2xl)">
        Request a Call Back
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          callbackReq(values);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {props =>
          generateMorffLiteForm({
            setCallToggle,
            isDesktopOrLaptop,
            ...props,
          })
        }
      </Formik>
    </div>
  );
};

CallBackForm.propTypes = {
  setCallToggle: PropTypes.func,
  isDesktopOrLaptop: PropTypes.bool,
};

CallBackForm.defaultProps = {
  setCallToggle: () => {},
};

export default CallBackForm;
