import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import FormikInput from 'components/molecules/FormikInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';

const EditPersonalForm = ({
  onCancel,
  data: { city, state, profession, firstName, lastName },
  onSave,
}) => {
  const getError = ({ key, errors, touched }) =>
    key && errors[key] && touched[key] ? errors[key] : null;

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

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/[a-zA-Z]/, 'Must be an alphabet')
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .matches(/[a-zA-Z]/, 'Must be an alphabet')
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    profession: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
  });

  const initialValues = {
    firstName,
    lastName,
    profession,
    city,
    state,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2));
        onSave(values);
        onCancel();
      }}
      validationSchema={validationSchema}
    >
      {({ values, handleSubmit, handleChange, errors, touched }) => (
        <div>
          <Form onSubmit={handleSubmit}>
            <DisplayCard
              heading="Edit My Details"
              lastChildPadding={false}
              childPadding="P($lg)"
            >
              <div className="D(f) Ai(c) Jc(sb) H($2xl)">
                <FormikInput
                  label="First Name"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  error={getError({ key: 'firstName', errors, touched })}
                />
                <FormikInput
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  value={values.lastName}
                  error={getError({ key: 'lastName', errors, touched })}
                />
              </div>
              <div className="D(f) Ai(c) Jc(sb) H($2xl)">
                <FormikInput
                  label="Profession"
                  name="profession"
                  id="profession"
                  onChange={handleChange}
                  value={values.profession}
                  error={getError({ key: 'profession', errors, touched })}
                />
              </div>
              <div className="D(f) Ai(c) Jc(sb) H($2xl)">
                <FormikInput
                  label="City / Town"
                  name="city"
                  id="city"
                  onChange={handleChange}
                  value={values.city}
                  error={getError({ key: 'city', errors, touched })}
                />
                <FormikInput
                  name="state"
                  id="state"
                  label="State"
                  onChange={handleChange}
                  value={values.state}
                  error={getError({ key: 'state', errors, touched })}
                />
              </div>
              <div className="D(f) Ai(c) Jc(c)">
                <Button {...cancelProps}>Cancel</Button>
                <Button {...saveProps}>Save</Button>
              </div>
            </DisplayCard>
          </Form>
        </div>
      )}
    </Formik>
  );
};

EditPersonalForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object,
};

EditPersonalForm.defaultProps = {
  onCancel: () => {},
};

export default EditPersonalForm;
