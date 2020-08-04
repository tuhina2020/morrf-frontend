import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormikCheckBox from 'components/molecules/FormikCheckBox';
import Input from 'components/molecules/Input';
import FormikInput from 'components/molecules/FormikInput';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { Form, FieldArray, getIn, Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import { wordCount } from 'utils/helper';

const removeProps = {
  iconDescription: 'Remove',
  alignContent: 'center',
  kind: 'danger',
  size: '10x',
  type: 'button',
  height: 'H($lg)',
  roundCorners: false,
  postIcon: 'remove',
};

const ExperienceFormCard = ({
  index,
  experience,
  errors,
  touched,
  handleChange,
  setFieldValue,
  remove,
  last = false,
}) => {
  const getError = (key, i) =>
    key &&
    get(errors, `allExperiences[${i}][${key}]`, null) &&
    get(touched, `allExperiences[${i}][${key}]`, null)
      ? get(errors, `allExperiences[${i}][${key}]`, null)
      : null;
  return (
    <div
      key={index}
      className={`Px($lg) Py($md) ${last ? '' : 'Bdb($bdcardGrey)'}`}
    >
      <div className="D(f) Ai(c) Jc(sb) H($2xl)">
        <FormikInput
          label="Designation"
          name={`allExperiences[${index}].designation`}
          id={`designation_${index}`}
          tabIndex={6 * index + 1}
          error={getError('designation', index)}
          value={experience.designation}
          onChange={handleChange}
        />
        <FormikInput
          name={`allExperiences[${index}].company`}
          id={`company_${index}`}
          label="Company"
          tabIndex={6 * index + 2}
          error={getError('company', index)}
          value={experience.company}
          onChange={handleChange}
        />
      </div>
      <div className="D(f) Ai(c) Jc(s) H($2xl) My($lg)">
        <FormikInput
          label="From"
          name={`allExperiences[${index}].from`}
          placeholder="mm/yyyy"
          id={`from_${index}`}
          tabIndex={6 * index + 3}
          autoComplete="off"
          dimensionClasses="W($10x) Mend($2xl)"
          error={getError('from', index)}
          value={experience.from}
          onChange={handleChange}
        />
        <FormikInput
          name={`allExperiences[${index}].to`}
          id={`to_${index}`}
          label="To"
          tabIndex={6 * index + 4}
          autoComplete="off"
          placeholder="mm/yyyy"
          disabled={experience.present}
          dimensionClasses="W($10x)"
          error={getError('to', index)}
          value={experience.to}
          onChange={handleChange}
        />
        <div className="Mstart($lg) Pos(r) T($xs) Bgc(white)">
          <FormikCheckBox
            name={`allExperiences[${index}].present`}
            value={experience.present}
            labelText="I work here currently"
            tabIndex={6 * index + 5}
            onChange={e => {
              handleChange(e);
              const v = e.target.value;
              if (v) {
                setFieldValue(`allExperiences[${index}].to`, '');
              }
            }}
          />
        </div>
      </div>
      <div className="Mt($2xl)">
        <FormikTextArea
          label="Description"
          name={`allExperiences[${index}].description`}
          id="description"
          heightClass="H($5xl)"
          placeholder="Brief description of your work"
          dimensionClasses="W($full)"
          tabIndex={6 * index + 6}
          onChange={handleChange}
          value={experience.description}
          error={getError('description', index)}
        />
      </div>
      <Button
        {...removeProps}
        // onClick={setTimeout(, 300)}
        onClick={() => remove(index)}
      >
        Remove
      </Button>
    </div>
  );
};

const ExperienceEditForm = ({ onCancel, data: experience, onSave }) => {
  const validationSchema = Yup.object().shape({
    allExperiences: Yup.array().of(
      Yup.object().shape({
        designation: Yup.string()
          .min(3, 'too short')
          .required('Required'),
        company: Yup.string().required('Required'),
        from: Yup.string()
          .matches(
            /^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
            'Enter valid date mm/yyyy',
          )
          .required('Required'),
        to: Yup.string()
          .matches(
            /^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
            'Enter valid date mm/yyyy',
          )
          .test('no-present', 'Required', function(toD) {
            return this.parent.present ? true : !isEmpty(toD);
          })
          .test('date-range-start', 'Less than start date', function(toD) {
            const fromString = this.parent.from;
            if (!fromString || this.parent.present) return true;
            const toDate = (toD || '/').split('/');
            const fromDate = fromString.split('/');
            return toDate[0] >= fromDate[0] && toDate[1] >= fromDate[1];
            // else {
            //   const d = new Date();
            //   const ye = new Intl.DateTimeFormat('en', {
            //     year: 'numeric',
            //   }).format(d);
            //   const mo = new Intl.DateTimeFormat('en', {
            //     month: '2-digit',
            //   }).format(d);
            //   const today = [mo, ye];
            //   return toDate[0] <= today[0] && toDate[1] <= today[1];
            // }
          }), // have to figure out a way if it is the present workplace
        present: Yup.boolean(),
        description: Yup.string()
          .required('Required')
          .test('word-count-limit', 'Min 10 words and Max 100 words', value => {
            if (!value) return false;
            const l = wordCount(value);
            return l >= 10 && l <= 100;
          }),
      }),
    ),
  });

  const emptyExperience = {
    designation: '',
    company: '',
    from: '',
    to: '',
    description: '',
    present: false,
  };
  const allExperiences = isEmpty(experience)
    ? [emptyExperience]
    : experience.map(ex => ({ present: false, ...ex }));
  const initialValues = {
    // allExperiences: sortBy(experience, 'order'),
    // allExperiences: [],
    allExperiences,
  };

  const activeSaveProps = {
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

  const addProps = {
    iconDescription: 'add',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'fc',
    height: 'H($lg)',
    type: 'button',
    roundCorners: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values));
        onSave({ experience: values.allExperiences });
        setSubmitting(false);
        onCancel();
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        handleSubmit,
        touched,
        errors,
      }) => (
        <div className="Bdrs($xs) Bgc(white) H($fc) W($60xl)">
          <Form onSubmit={handleSubmit}>
            <FieldArray
              name="allExperiences"
              render={({ remove, push, insert }) => (
                <>
                  <div className="D(f) Ai(c) Jc(sb) Fz($mmd) Lh(1) Px($lg) Py($xss) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
                    <div>Edit Experience</div>
                    <Button
                      {...addProps}
                      onClick={() => {
                        console.log('ADD FRIEND');
                        setTimeout(() => push(emptyExperience), 300);
                      }}
                    >
                      Add +
                    </Button>
                  </div>
                  <div className="Mah($6xxl) Ov(s)">
                    {values.allExperiences.map((experience, index) => (
                      <ExperienceFormCard
                        index={index}
                        experience={experience}
                        errors={errors}
                        touched={touched}
                        remove={remove}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        last={index === values.allExperiences.length - 1}
                      />
                    ))}
                  </div>
                  <div
                    className={`D(f) Ai(c) Jc(c) ${
                      values.allExperiences.length > 2
                        ? 'Pos(f) W($60xl) T(80%)'
                        : ''
                    } Bdt($bdcardGrey)`}
                  >
                    <Button {...cancelProps}>Cancel</Button>
                    <Button
                      {...activeSaveProps}
                      disabled={values.allExperiences.length === 0}
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

ExperienceEditForm.propTypes = {
  onCancel: PropTypes.func,
  experience: PropTypes.array,
};

ExperienceEditForm.defaultProps = {
  onCancel: () => {},
};

export default ExperienceEditForm;
