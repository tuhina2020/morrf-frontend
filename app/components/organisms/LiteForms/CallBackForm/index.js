import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import FormikCalendar from 'components/molecules/Calendar';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button/index';
import BaseIcon from 'components/atoms/BaseIcon';
import SuccessAnimation from 'Assets/gifs/success.gif';
const generateMorffLiteForm = ({
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
  setCallToggle,
  setFieldValue,
  isDesktopOrLaptop,
  setName,
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
        onChange={e => {
          handleChange(e);
          setName(values.name);
        }}
        value={values.name}
        error={getError('name')}
      />
      <FormikInput
        dimensionClasses={dimensionClasses}
        label="Your phone no."
        name="phone_number"
        id="phone_number"
        onChange={handleChange}
        value={values.phone_number}
        error={getError('phone_number')}
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

const CallBackForm = props => {
  const {
    setCallToggle,
    isDesktopOrLaptop,
    callbackReq,
    success,
    setName,
    initName,
  } = props;
  const YupObj = {
    name: Yup.string()
      .matches(/^[a-zA-Z ]*$/, 'Numbers not allowed')
      .min(3, 'Enter atleast 3 letters')
      .required('Required'),
    phone_number: Yup.string()
      .matches(/^[0-9]{10}$/, 'Enter valid phone number')
      .required('Required'),
    date: Yup.string().required('Required'),
    time: Yup.string().required('Required'),
  };
  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    name: initName,
    phone_number: '',
    date: '',
    time: '',
  };

  const [submitted, setSubmitted] = useState(false);
  const [submitCount, setCount] = useState(0);
  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
    }
  }, [submitted]);
  const anotherReqButton = {
    iconDescription: 'again',
    alignContent: 'center',
    kind: 'secondary',
    type: 'button',
    onClick: () => setCount(0),
  };

  return (
    <div
      className={`${
        isDesktopOrLaptop ? 'W(530px)' : 'W(320px)'
      } H(a) Bgc(white) Bxsh($bxshhighlight) M(a) Bdrs($xs) P($lg) O(1) Pos(r)`}
    >
      {submitCount > 0 && !submitted ? (
        <div className="Mx(a) W(fc) H($50xl) Pos(r) T($20x)">
          <Button {...anotherReqButton}>Submit Another response</Button>
        </div>
      ) : null}
      {submitted && submitCount === 1 ? (
        <img src={SuccessAnimation} className="W($full)" />
      ) : submitCount === 0 ? (
        <>
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
              resetForm({ values: initialValues });
              setName('');
              setSubmitting(false);
              setCount(1);
              setSubmitted(true);
            }}
            validationSchema={validationSchema}
          >
            {props =>
              generateMorffLiteForm({
                setCallToggle,
                isDesktopOrLaptop,
                setName,
                ...props,
              })
            }
          </Formik>
        </>
      ) : null}
    </div>
  );
};

CallBackForm.propTypes = {
  setCallToggle: PropTypes.func,
  isDesktopOrLaptop: PropTypes.bool,
  name: PropTypes.string,
  setName: PropTypes.func,
};

CallBackForm.defaultProps = {
  setCallToggle: () => {},
};

export default CallBackForm;
