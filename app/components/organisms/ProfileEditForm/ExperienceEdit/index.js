import React from 'react';
import PropTypes from 'prop-types';
import FormikCheckBox from 'components/molecules/FormikCheckBox';
import FormikInput from 'components/molecules/FormikInput';
import FormikCalendar from 'components/molecules/Calendar';
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
  startYear,
  endYear,
  present = false,
  highlights,
  errors,
  touched,
  handleChange,
  handleSubmit,
  values,
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
          name="startYear"
          placeholder="mm/yyyy"
          id="startYear"
          autoComplete="off"
          dimensionClasses="W($10x) Mend($2xl)"
          error={getError('startYear')}
          value={startYear}
          onChange={handleChange}
        />
        <FormikInput
          name="endYear"
          id="endYear"
          label="To"
          autoComplete="off"
          placeholder="mm/yyyy"
          disabled={present}
          dimensionClasses="W($10x) Mstart($xss)"
          error={!present ? getError('endYear') : ''}
          value={endYear}
          onChange={handleChange}
        />
      </div>
      <FormikTextArea
        label="Description"
        name="highlights"
        id="highlights"
        heightClass="H($5xl)"
        placeholder="Brief description of your work"
        dimensionClasses="W($full)"
        onChange={handleChange}
        value={highlights}
        error={getError('highlights')}
      />
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
  removeExperience,
}) => {
  const onRemove = () => {
    if (currentIndex >= 0) {
      const newExperience = experience.filter((obj, i) => i === currentIndex);
      // debugger;
      removeExperience(newExperience[0]);
      onCancel();
    }
  };
  const validationSchema = Yup.object().shape({
    designation: Yup.string()
      .min(3, 'too short')
      .required('Required'),
    company: Yup.string().required('Required'),
    startYear: Yup.string()
      .matches(/^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/, 'Enter valid date mm/yyyy')
      .required('Required'),
    endYear: Yup.string()
      .matches(/^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/, 'Enter valid date mm/yyyy')
      .test('no-present', 'Required', function(toD) {
        return this.parent.present ? true : !isEmpty(toD);
      })
      .test('date-range-start', 'Less than start date', function(toD) {
        const fromString = this.parent.startYear;
        if (!fromString || this.parent.present) return true;
        const toDate = (toD || '/').split('/');
        const fromDate = fromString.split('/');
        return (
          toDate[1] >= fromDate[1] ||
          (toDate[0] >= fromDate[0] && toDate[1] === fromDate[1])
        );
      }),
    present: Yup.boolean(),
    highlights: Yup.string()
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
    startYear: '',
    endYear: '',
    highlights: '',
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
        const index = currentIndex >= 0 ? currentIndex : experience.length;
        const newExperience = [...experience];
        newExperience[index] = values;
        onSave({ experience: values, newExperience });
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
        <div className="Bdrs($xs) Bgc(white) W($60xl)">
          <Form onSubmit={handleSubmit}>
            <div className="Fz($mmd) Lh(1) Px($lg) Pb($xss) Pt($md) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
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
              <Button {...activeSaveProps}>Save</Button>
            </div>
          </Form>
        </div>
      )}
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
