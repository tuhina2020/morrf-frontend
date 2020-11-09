import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import BaseIcon from 'components/atoms/BaseIcon';
import FormikInput from 'components/molecules/FormikInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikCheckBox from 'components/molecules/FormikCheckBox/dropdown';
const ResetPassword = ({
  next,
  back,
  forgot,
  user,
  wrapperClass,
  submitText,
  resend,
  heading,
  subheading,
  label,
  confirmLabel,
  ...props
}) => {
  const [validate, setValidate] = useState([false, false, false]);
  const [submittable, setSubmittable] = useState([false, false, false]);

  const generateOnChange = ({ change, tabIndex }) => e => {
    if (validate[tabIndex]) {
      const newValidate = [...validate];
      newValidate[tabIndex] = false;
      setValidate(newValidate);
    }
    change(e.target.value);
  };

  const generateSubmitFunction = ({ tabIndex }) => val => {
    const newSubmittable = [...submittable];
    newSubmittable[tabIndex] = val;
    setSubmittable(newSubmittable);
  };

  const extraValidation = ({ value, name }) => ({
    valid: name === 'password' ? value === confirmPassword : value === password,
    invalidText: 'New Password doesnot match the password above',
  });

  const passwordObj = Yup.string()
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
    .required('Required');
  const YupObj = {
    password: passwordObj,
    accepted: Yup.bool().oneOf([true], 'Please accept terms and conditions'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match")
      .required('Required'),
    verificationCode: Yup.string()
      .length(6, 'Enter six characters')
      .required('Required'),
  };
  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    password: '',
    confirmPassword: '',
    verificationCode: '',
    accepted: false,
  };

  const signInButtonProps = {
    iconDescription: 'Sign In',
    alignContent: 'center',
    kind: 'primary',
    size: 'fc',
    type: 'submit',
  };

  const resendButtonProps = {
    iconDescription: 'resend',
    alignContent: 'center',
    kind: 'tertiary',
    onClick: resend,
    type: 'button',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        next(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, touched, handleChange }) => {
        const getError = key =>
          key && errors[key] && touched[key] ? errors[key] : null;
        return (
          <>
            <form onSubmit={handleSubmit} noValidate>
              <div className="Mb($lg)">
                <FormikInput
                  value={values.password}
                  dimensionClasses="W($30x)"
                  label={label}
                  type="password"
                  id="password"
                  onChange={handleChange}
                  error={getError('password')}
                />
              </div>
              <div className="Mb($lg)">
                <FormikInput
                  value={values.confirmPassword}
                  label={confirmLabel}
                  type="password"
                  id="confirmPassword"
                  dimensionClasses="W($30x)"
                  onChange={handleChange}
                  error={getError('confirmPassword')}
                />
              </div>
              <div className="Mb($lg)">
                <FormikInput
                  value={values.verificationCode}
                  label="Verification code"
                  type="password"
                  id="verificationCode"
                  dimensionClasses="W($30x)"
                  onChange={handleChange}
                  error={getError('verificationCode')}
                />
              </div>
              <FormikCheckBox
                name="accepted"
                value={values.accepted}
                labelSize="sm"
                bluePosition="Start(58px)"
                bgColorStyle="Bgc($navBarBg)"
                onChange={handleChange}
                error={getError('accepted')}
              >
                <div>
                  I agree to Morff{' '}
                  <span>
                    <a href="/termsofuse" className="C($black)">
                      Terms of Use
                    </a>
                  </span>{' '}
                  and{' '}
                  <span>
                    <a href="/privacy">Privacy Policy</a>
                  </span>{' '}
                </div>
              </FormikCheckBox>
              <div className="Mt($5x) Mx(a) W(fc)">
                <Button {...signInButtonProps}>
                  <div>{submitText}</div>
                </Button>
              </div>
            </form>

            <div className="Fz($fzbutton) Ta(start) Mt($lg)">
              <div>Did not receive Verification Code ?</div>
              <div className="Mt($xs)">
                <Button {...resendButtonProps}>
                  <div>Click here to resend</div>
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

ResetPassword.propTypes = {
  submitText: PropTypes.string,
  wrapperClass: PropTypes.string,
  width: PropTypes.string,
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  forgot: PropTypes.func.isRequired,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  confirmPassword: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  verificationCode: PropTypes.string,
  setConfirmPassword: PropTypes.func,
  resend: PropTypes.func,
  setCode: PropTypes.func,
};

ResetPassword.defaultProps = {
  submitText: 'Reset Password',
  next: () => {},
  back: () => {},
  forgot: () => {},
  wrapperClass:
    'Bgc(white) Bxsh($bxshhighlight) Ff($ffmanrope) Mx(a) W(fc) Bdrs($bdrscontainer) Px($5xl) Pt($2xl) Pb($9xl) Mb($2xl)',
};

export default ResetPassword;
