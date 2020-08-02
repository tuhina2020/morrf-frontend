import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditCard from 'components/organisms/EditCard';
import DisplayCard from 'components/molecules/DisplayCard';
import Input from 'components/molecules/Input';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import { wordCount } from 'utils/helper';

const AboutEditForm = ({ onCancel, data, onSave }) => {
  const Formik = useFormik({
    initialValues: {
      about: data,
    },
    onSubmit: values => {
      onSave(values);
      onCancel();
    },
    validationSchema: Yup.object({
      about: Yup.string()
        .required('Required')
        .test('word-count-limit', 'Min 30 words and Max 100 words', value => {
          const l = wordCount(value);
          return l >= 30 && l <= 100;
        }),
    }),
  });

  const getError = key =>
    key && Formik.errors[key] && Formik.touched[key]
      ? Formik.errors[key]
      : null;

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
    type: 'reset',
    roundCorners: false,
    onClick: onCancel,
  };

  return (
    <form noValidate onSubmit={Formik.handleSubmit}>
      <DisplayCard
        heading="Edit About Me"
        lastChildPadding={false}
        // childPadding="Px($lg) Py($md)"
        childPadding="Px($lg) Pb($lmg) Pt($md)"
      >
        <FormikTextArea
          label="About"
          name="about"
          id="about"
          placeholder="Please write a brief description about your work, passion or what drives you to pursue design."
          dimensionClasses="W($full)"
          tabIndex={1}
          onChange={Formik.handleChange}
          value={Formik.values.about}
          error={getError('about')}
        />
        <div className="D(f) Ai(c) Jc(c)">
          <Button {...cancelProps}>Cancel</Button>
          <Button {...saveProps}>Save</Button>
        </div>
      </DisplayCard>
    </form>
  );
};

AboutEditForm.propTypes = {
  onCancel: PropTypes.func,
  about: PropTypes.string,
};

AboutEditForm.defaultProps = {
  onCancel: () => {},
  about: '',
};

export default AboutEditForm;
