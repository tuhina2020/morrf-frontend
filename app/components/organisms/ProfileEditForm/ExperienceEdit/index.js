import React from 'react';
import PropTypes from 'prop-types';
import FormikCheckBox from 'components/molecules/FormikCheckBox';
import FormikInput from 'components/molecules/FormikInput';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { Form, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
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
  currentIndex,
  designation,
  company,
  from,
  to,
  present = false,
  description,
  errors,
  touched,
  handleChange,
  setFieldValue,
  onRemove,
}) => {
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;

  return (
    <div className="P($lg) Bdb($bdcardGrey)">
      <div className="D(f) Ai(c) Jc(sb) H($2xl)">
        <FormikInput
          label="Designation"
          name="designation"
          id="designation"
          error={getError('designation')}
          value={designation}
          onChange={handleChange}
        />
        <FormikInput
          name="company"
          id="company"
          label="Company"
          error={getError('company')}
          value={company}
          onChange={handleChange}
        />
      </div>
      <div className="D(f) Ai(c) Jc(s) H($2xl) My($lg)">
        <FormikInput
          label="From"
          name="from"
          placeholder="mm/yyyy"
          id="from"
          autoComplete="off"
          dimensionClasses="W($10x) Mend($2xl)"
          error={getError('from')}
          value={from}
          onChange={handleChange}
        />
        <FormikInput
          name="to"
          id="to"
          label="To"
          autoComplete="off"
          placeholder="mm/yyyy"
          disabled={present}
          dimensionClasses="W($10x)"
          error={getError('to')}
          value={to}
          onChange={handleChange}
        />
        <div className="Mstart($lg) Pos(r) T($xs) Bgc(white)">
          <FormikCheckBox
            name="present"
            value={present || false}
            labelText="I work here currently"
            onChange={e => {
              handleChange(e);
              const value = e.target.value;
              const v = value && value.length > 0 && JSON.parse(value);
              if (!v) {
                setFieldValue('to', '');
              }
            }}
          />
        </div>
      </div>
      <div className="My($lg)">
        <FormikTextArea
          label="Description"
          name="description"
          id="description"
          heightClass="H($5xl)"
          placeholder="Brief description of your work"
          dimensionClasses="W($full)"
          onChange={handleChange}
          value={description}
          error={getError('description')}
        />
      </div>
      {currentIndex >= 0 ? (
        <Button {...removeProps} onClick={onRemove}>
          Remove
        </Button>
      ) : null}
    </div>
  );
};

const ExperienceEditForm = ({
  onCancel,
  data: experience,
  onSave,
  currentIndex,
}) => {
  const onRemove = () => {
    if (currentIndex >= 0) {
      const newExperience = experience.filter((obj, i) => i !== currentIndex);
      onSave({ experience: newExperience });
      onCancel();
    }
  };
  const validationSchema = Yup.object().shape({
    designation: Yup.string()
      .min(3, 'too short')
      .required('Required'),
    company: Yup.string().required('Required'),
    from: Yup.string()
      .matches(/^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/, 'Enter valid date mm/yyyy')
      .required('Required'),
    to: Yup.string()
      .matches(/^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/, 'Enter valid date mm/yyyy')
      .test('no-present', 'Required', function(toD) {
        return this.parent.present ? true : !isEmpty(toD);
      })
      .test('date-range-start', 'Less than start date', function(toD) {
        const fromString = this.parent.from;
        if (!fromString || this.parent.present) return true;
        const toDate = (toD || '/').split('/');
        const fromDate = fromString.split('/');
        return toDate[0] >= fromDate[0] && toDate[1] >= fromDate[1];
      }),
    present: Yup.boolean(),
    description: Yup.string()
      .required('Required')
      .test('word-count-limit', 'Min 5 words and Max 100 words', value => {
        if (!value) return false;
        const l = wordCount(value);
        return l >= 5 && l <= 100;
      }),
  });

  const emptyExperience = {
    designation: '',
    company: '',
    from: '',
    to: '',
    description: '',
    present: false,
  };
  const initialValues =
    currentIndex === 0 || currentIndex
      ? { ...experience[currentIndex] }
      : emptyExperience;

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
        const index = currentIndex >= 0 ? currentIndex : experience.length;
        let newExperience = [...experience];
        newExperience[index] = values;
        onSave({ experience: newExperience });
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
      }) => {
        // debugger;
        return (
          <div className="Bdrs($xs) Bgc(white) W($60xl)">
            <Form onSubmit={handleSubmit}>
              <div className="Fz($mmd) Lh(1) Px($lg) Py($xss) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
                Edit Experience
              </div>
              <div className="Mah($45x) Ov(s)">
                <ExperienceFormCard
                  currentIndex={currentIndex}
                  {...values}
                  errors={errors}
                  touched={touched}
                  // remove={remove}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  onRemove={onRemove}
                />
              </div>
              <div className="D(f) Ai(c) Jc(c)">
                <Button {...cancelProps}>Cancel</Button>
                <Button
                  {...activeSaveProps}
                  disabled={isEmpty(errors) ? isEmpty(experience) : false}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

ExperienceEditForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.array,
};

ExperienceEditForm.defaultProps = {
  onCancel: () => {},
  data: [],
};

export default ExperienceEditForm;
