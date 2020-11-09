import React from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { wordCount } from 'utils/helper';
import NestedFormikComboBox from 'components/molecules/FormikComboBox/nested';
import FormikCalendar from 'components/molecules/Calendar';
import FileUpload from 'components/molecules/DragDrop/file2';
const CreateProjectFormComponent = ({
  skillsList,
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
  setFieldValue,
}) => {
  console.log(errors);
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;
  return (
    <div className="Bgc(white)">
      <div className="P($lg) W($full) Mah($60xl) Ov(s)">
        <FormikInput
          label="Client/ Company name"
          name="client"
          dimensionClasses="W($full) Mb($lg)"
          id="client"
          onChange={handleChange}
          value={values.client}
          error={getError('client')}
        />
        <FormikInput
          name="title"
          id="title"
          dimensionClasses="W($full) Mb($lg)"
          label="Project Title"
          onChange={handleChange}
          value={values.title}
          error={getError('title')}
        />
        <FormikTextArea
          label="Project Description"
          name="description"
          id="description"
          placeholder="Project Description"
          dimensionClasses="W($full) Mb($lg)"
          onChange={handleChange}
          value={values.description}
          error={getError('description')}
        />
        <FormikInput
          name="budget"
          id="budget"
          dimensionClasses="W($25x) Mb($lg)"
          label="Planned Budget"
          onChange={handleChange}
          value={values.budget}
          error={getError('budget')}
        />
        <div className="D(f) Ai(c) Jc(sb) Mb($lg)">
          <FormikCalendar
            label="Preferred start date"
            name="startDate"
            id="startDate"
            dimensionClasses="W($25x)"
            onChange={handleChange}
            value={values.startDate}
            error={getError('startDate')}
            setUpstreamDate={val => {
              setFieldValue('startDate', new Date(val).toDateString());
            }}
          />
          <FormikInput
            name="duration"
            id="duration"
            label="Planned project duration"
            dimensionClasses="W($25x)"
            onChange={handleChange}
            value={values.duration}
            error={getError('duration')}
          />
        </div>
        <div className="Fz($mmd) Lh(1) Ff($ffmanrope) Mb($sm)">
          Project Tags
        </div>
        <div className="Mb($lg)">
          <NestedFormikComboBox
            id="tags"
            name="tags"
            type="text"
            inline={true}
            labelText="Add one or more project tags"
            sliceInline={2}
            prependIcon="showmore"
            // onKeyPress={onEnter}
            onChange={params => {
              setFieldValue('tags', params);
            }}
            items={skillsList}
            viewableValues={values.tags}
          />
        </div>
        <div className="Fz($mmd) Lh(1) Ff($ffmanrope) Mb($sm)">
          Add attachments
        </div>
        <FileUpload
          multiple
          name="example-upload"
          maxSize={10}
          filesExisting={values.images}
          onChange={v => {
            // let { images } = values;
            // images[index] = v;
            setFieldValue('images', v);
            // uploadImageData({ files: v }); //UPLOAD TO SERVER
          }}
          showPreview
        />
      </div>
    </div>
  );
};

const CreateProjectForm = ({ onCancel, onSave, skillsList, onCb }) => {
  const YupObj = {
    title: Yup.string()
      .min(3, 'too short')
      .required('Required'),
    client: Yup.string().required('Required'),
    startDate: Yup.string().required('Required'),
    description: Yup.string()
      .required('Required')
      .test('word-count-limit', 'Min 5 words and Max 100 words', value => {
        if (!value) return false;
        const l = wordCount(value);
        return l >= 5 && l <= 100;
      }),
    budget: Yup.number()
      .integer('Enter amount')
      .min(1000, 'Enter atleast 1000')
      .required('Required'),
    duration: Yup.number()
      .integer('Enter duration')
      .required('Required'),
  };
  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    title: '',
    client: '',
    startDate: '',
    description: '',
    budget: '',
    duration: '',
    tags: [],
    images: [],
  };

  const saveProps = {
    iconDescription: 'Save',
    alignContent: 'center',
    kind: 'primary',
    size: 'half',
    type: 'submit',
    roundCorners: false,
  };
  const cancelProps = {
    iconDescription: 'Close',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'half',
    type: 'button',
    roundCorners: false,
    onClick: onCancel,
  };

  const cbButtonProps = {
    iconDescription: 'callback',
    alignContent: 'center',
    kind: 'secondary',
    size: 'full',
    onClick: onCb,
  };

  return (
    <div className="Bgc(white)">
      <div className="Fz($mmd) Lh(1) Px($lg) Py($xss) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
        Post New Project
      </div>
      <div className="P($lg) Bdb($bdcardGrey)">
        <Button {...cbButtonProps}>
          Don’t know where to start? Click here to request a call back.
        </Button>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log(onSave);
          onSave(values);
          setSubmitting(false);
          onCancel();
        }}
        validationSchema={validationSchema}
      >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <CreateProjectFormComponent {...props} skillsList={skillsList} />
            <div className="D(f) Ai(c) Jc(c) Bdt($bdcardGrey)">
              <Button {...cancelProps}>Close</Button>
              <Button {...saveProps}>Save</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CreateProjectForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
};

CreateProjectForm.defaultProps = {
  onCancel: () => {},
  onSave: () => {},
};

export default CreateProjectForm;
