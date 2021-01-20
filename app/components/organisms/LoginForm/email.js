import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import { Formik, Form } from 'formik';
import Button from 'components/molecules/Button';
import GoogleLogin from 'components/molecules/GoogleLogin';
import * as Yup from 'yup';
const EnterEmail = ({
  submitText,
  wrapperClass,
  next,
  email,
  setEmail,
  signInGoogleApi,
  checkUser,
}) => {
  const [validate, setValidate] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const YupObj = {
    email: Yup.string()
      .trim()
      .min(4, 'Enter atleast four characters')
      .email('Enter a valid email')
      .required('Required'),
  };
  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    email,
  };

  const buttonProps = {
    iconDescription: 'Submit Email',
    alignContent: 'center',
    kind: 'primary',
    size: '10x',
    tabIndex: 2,
    type: 'submit',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          next(values.email);
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors, touched, handleSubmit }) => {
          const getError = key =>
            key && errors[key] && touched[key] ? errors[key] : null;
          return (
            <Form onSubmit={handleSubmit}>
              <FormikInput
                label="Email address"
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
                dimensionClasses="W($30xl) Mx(a)"
                error={getError('email')}
              />
              <div className="Mt($5x) Mx(a) W($10x)">
                <Button {...buttonProps}>{submitText}</Button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* <div className="My($2xl) D(f) Ai(c) Jc(c)">
        <div className="H(1px) W($half) Bgc($hoverInput)" />
        <div className="W(40px)">or</div>
        <div className="H(1px) W($half) Bgc($hoverInput)" />
      </div>
      <div className="Mx(a) W(fc)">
        <GoogleLogin signInApi={signInGoogleApi} checkUser={checkUser} />
      </div> */}
    </>
  );
};

EnterEmail.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  width: PropTypes.string,
  next: PropTypes.func.isRequired,
  signInGoogleApi: PropTypes.func,
  setEmail: PropTypes.func,
};

EnterEmail.defaultProps = {
  submitText: 'Next',
  signInGoogleApi: () => {},
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer) Px($5xl) Pt($2xl) Pb($9xl) Mb($2xl)',
};

export default EnterEmail;
