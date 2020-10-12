import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import Button from 'components/molecules/Button';
import { PASSWORD_VALIDATION_OBJ } from './constants';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
const ExistingPassword = ({
  next,
  forgot,
  wrapperClass,
  submitText,
  password,
}) => {
  const [validate, setValidate] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const YupObj = {
    password: Yup.string()
      .matches(/[A-Z]/, {
        excludeEmptyString: true,
        message: 'Password must have atleast one capital letter',
      })
      .matches(/[a-z]/, {
        excludeEmptyString: true,
        message: 'Password must have atleast one small letter',
      })
      .matches(/[0-9]/, {
        excludeEmptyString: true,
        message: 'Password must have atleast one digit',
      })
      .matches(/[!@#$%^&*(),.?":{}|<>]/, {
        excludeEmptyString: true,
        message: 'Password must have atleast one special character',
      })
      .min(8, 'Enter atleast eight characters')
      .required('Required'),
  };
  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    password: '',
  };

  const forgotPasswordButton = {
    iconDescription: 'Forgot Password',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'fc',
    tabIndex: 3,
    onClick: forgot,
    type: 'button',
  };

  const signInButtonProps = {
    iconDescription: 'Sign In',
    alignContent: 'center',
    kind: 'primary',
    size: '10x',
    tabIndex: 2,
    type: 'submit',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        next(values.password);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, touched, handleChange }) => {
        console.log(errors);
        const getError = key =>
          key && errors[key] && touched[key] ? errors[key] : null;
        return (
          <Form onSubmit={handleSubmit}>
            <FormikInput
              label="Password"
              name="password"
              id="password"
              onChange={handleChange}
              value={values.password}
              error={getError('password')}
              type="password"
            />
            <div className="Mt($5x) D(f) Ai(c) Jc(sb)">
              <Button {...forgotPasswordButton}>
                <div>Forgot Password</div>
              </Button>
              <Button {...signInButtonProps}>
                <div>{submitText}</div>
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

ExistingPassword.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  width: PropTypes.string,
  next: PropTypes.func.isRequired,
  forgot: PropTypes.func.isRequired,
  password: PropTypes.string,
};

ExistingPassword.defaultProps = {
  submitText: 'Sign In',
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer) Px($5xl) Pt($2xl) Pb($9xl) Mb($2xl)',
};

export default ExistingPassword;
