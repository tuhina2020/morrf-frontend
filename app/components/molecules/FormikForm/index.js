import React from 'react';
import { Formik } from 'formik';

const FormikForm = ({
  formComponent,
  onSubmit,
  validationSchema,
  initialValues,
  children,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    render={children}
  />
);

export default FormikForm;
