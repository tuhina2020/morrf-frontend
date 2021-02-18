import { FieldProps } from 'formik';
import React from 'react';
import Select, { Option, ReactSelectProps } from 'react-select';

export const SelectField = ({ options, field, form }) => (
  <Select
    options={options}
    placeholder="Proof Type"
    name={field.name}
    value={options ? options.find(option => option.value === field.value) : ''}
    onChange={option => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur}
  />
);
export default SelectField;
