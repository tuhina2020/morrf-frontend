import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/molecules/FormikInput';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { Form, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';
import get from 'lodash/get';
import { wordCount } from 'utils/helper';
import FileUpload from 'components/molecules/DragDrop/file2';
import { values } from 'lodash';
import FormikCalendar from 'components/molecules/Calendar';

const PortfolioFormCard = ({
  errors,
  touched,
  handleChange,
  onRemove,
  onCancel,
  uploadImageData,
  portfolioImages,
  removePortfolioImage,
  setFieldValue,
  ...portfolio
}) => {
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;

  const removeProps = {
    iconDescription: 'Remove',
    alignContent: 'center',
    kind: 'danger',
    size: '15xl',
    type: 'button',
    height: 'H($lg)',
    roundCorners: false,
    postIcon: 'remove',
  };
  let minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 30);
  return (
    <div className="Pos(r) Mah($45x) Ov(s) P($lg)">
      <div className="D(f) Ai(c) Jc(sb)">
        <FormikInput
          label="Project name"
          dimensionClasses="W($xmd) H($2xl)"
          name="project"
          id="project"
          error={getError('project')}
          value={portfolio.project}
          onChange={handleChange}
        />
        <FormikInput
          dimensionClasses="W($xmd) H($2xl) Mstart($2xl)"
          name="client"
          id="client"
          label="Client"
          error={getError('client')}
          value={portfolio.client}
          onChange={handleChange}
        />
      </div>
      <div className="D(f) Ai(c) Jc(s) My($lg)">
        <FormikCalendar
          label="From"
          name="startYear"
          id="startYear"
          placeholder="mm/dd/yyyy"
          dateFormat="MM/dd/yyyy"
          dimensionClasses={'W($11xl) H($2xl) Mend($md) Pos(r) Ta(start)'}
          value={portfolio.startYear}
          minDate={minDate}
          selectYear={true}
          error={getError('startYear')}
          setUpstreamDate={val => {
            const [year, month, date] = new Date(val)
              .toISOString()
              .split('T')[0]
              .split('-');
            setFieldValue('startYear', month + '/' + date + '/' + year);
          }}
        />
        <FormikCalendar
          label="To"
          name="endYear"
          id="endYear"
          selectYear={true}
          placeholder="mm/dd/yyyy"
          dateFormat="MM/dd/yyyy"
          dimensionClasses={'W($11xl) H($2xl) Mend($md) Pos(r) Ta(start)'}
          value={portfolio.endYear}
          minDate={minDate}
          error={getError('endYear')}
          setUpstreamDate={val => {
            const [year, month, date] = new Date(val)
              .toISOString()
              .split('T')[0]
              .split('-');
            setFieldValue('endYear', month + '/' + date + '/' + year);
          }}
        />
      </div>
      <FormikTextArea
        label="Description"
        name="highlights"
        id="highlights"
        heightClass="H($5xl)"
        placeholder="Brief description of your work"
        dimensionClasses="W($full) My($lg)"
        onChange={handleChange}
        value={portfolio.highlights}
        error={getError('highlights')}
      />
      <div className="Fz($smx) Lh(1) Ff($ffmanrope)">Add Files</div>
      <FileUpload
        multiple
        name="example-upload"
        maxSize={10}
        filesExisting={portfolio.files}
        uploadedFiles={portfolioImages}
        onRemove={index => removePortfolioImage({ id: portfolio.id, index })}
        onChange={data => uploadImageData({ files: data, id: portfolio.id })}
        showPreview
      />
      {portfolio && portfolio.id ? (
        <Button {...removeProps} onClick={onRemove}>
          Remove Project
        </Button>
      ) : null}
    </div>
  );
};

const PortfolioEditForm = ({
  onCancel,
  data: portfolio,
  currentIndex,
  onSave,
  uploadImageData,
  removePortfolio,
  removePortfolioImage,
  portfolioImages,
}) => {
  const validationSchema = Yup.object().shape({
    project: Yup.string()
      .min(3, 'too short')
      .required('Required'),
    client: Yup.string().required('Required'),
    startYear: Yup.string()
      .matches(
        /^((((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/))\d{4}$/,
        'Enter valid date mm/dd/yyyy',
      )
      .required('Required'),
    endYear: Yup.string()
      .matches(
        /^((((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/))\d{4}$/,
        'Enter valid date mm/dd/yyyy',
      )
      .test(
        'test-endDate',
        'End date should be after start date',
        function checkEnd(end) {
          return new Date(this.parent.startYear) < new Date(end);
        },
      )
      .required('Required'),
    highlights: Yup.string()
      .required('Required')
      .test('word-count-limit', 'Min 5 words and Max 100 words', value => {
        if (!value) return false;
        const l = wordCount(value);
        return l >= 5 && l <= 100;
      }),
  });

  const emptyPortfolio = {
    project: '',
    client: '',
    startYear: '',
    endYear: '',
    highlights: '',
    images: [],
  };
  const initialValues =
    currentIndex === 0 || currentIndex
      ? portfolio[currentIndex]
      : emptyPortfolio;

  const [forward, setForward] = useState(true);
  const onRemove = () => {
    if (currentIndex >= 0) {
      const newPortfolio = portfolio.filter((obj, i) => i === currentIndex)[0];
      // onSave({ portfolio: newPortfolio });
      removePortfolio(newPortfolio);
      onCancel();
    }
  };

  const imageUploadSuccess = isEmpty(portfolioImages)
    ? false
    : portfolioImages.reduce((acc, cur) => {
        const success = !isEmpty(cur.id);
        return acc && success;
      }, true);

  const activeSaveProps = {
    iconDescription: 'Save',
    alignContent: 'center',
    kind: 'primary',
    size: 'half',
    type: 'submit',
    roundCorners: false,
    disabled: !imageUploadSuccess,
  };

  const onCancelHandler = ({ values, mode }) => () => {
    const index = currentIndex >= 0 ? currentIndex : portfolio.length;
    const newPortfolio = [...portfolio];
    newPortfolio[index] = {
      ...values,
      mode: values.mode === 'completed' ? 'completed' : mode,
    };
    onSave({ portfolio: newPortfolio[index], newPortfolio });
    onCancel();
  };

  const cancelProps = {
    iconDescription: 'Cancel',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'half',
    type: 'button',
    roundCorners: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        onCancelHandler({ values, mode: 'completed' })();
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        touched,
        errors,
        setFieldValue,
      }) => (
        <div className="Bdrs($xs) Bgc(white)">
          <Form onSubmit={handleSubmit}>
            <>
              <div className="Fz($mmd) Lh(1) Px($lg) Pb($xss) Pt($md) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
                Edit Portfolio
              </div>
              <PortfolioFormCard
                {...values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                onRemove={onRemove}
                onCancel={onCancel}
                uploadImageData={uploadImageData}
                removePortfolioImage={removePortfolioImage}
                portfolioImages={portfolioImages}
              />
              <div className="D(f) Ai(c) Jc(c) Bdt($bdcardGrey)">
                <Button {...cancelProps} onClick={onCancel}>
                  Cancel
                </Button>
                <Button {...activeSaveProps}>Save</Button>
              </div>
            </>
          </Form>
        </div>
      )}
    </Formik>
  );
};

PortfolioEditForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.array,
};

PortfolioEditForm.defaultProps = {
  onCancel: () => {},
  data: [],
};

export default PortfolioEditForm;
