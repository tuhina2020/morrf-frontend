import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormikCheckBox from 'components/molecules/FormikCheckBox';
import Input from 'components/molecules/Input';
import FormikInput from 'components/molecules/FormikInput';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { Form, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import FormikForm from 'components/molecules/FormikForm';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import { wordCount } from 'utils/helper';

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

const PortfolioFormCard = ({
  index,
  portfolio,
  errors,
  touched,
  handleChange,
  setFieldValue,
  remove,
  current = false,
}) => {
  // if (!current) return null;
  console.log('RENDER ', index, current);
  const getError = (key, i) =>
    key &&
    get(errors, `allPortfolios[${i}][${key}]`, null) &&
    get(touched, `allPortfolios[${i}][${key}]`, null)
      ? get(errors, `allPortfolios[${i}][${key}]`, null)
      : null;
  return (
    <div
      key={`portfolio_${index}`}
      className={`Px($xlg) Py($md) Bgc(white) W($60xl)`}
    >
      <div className="D(f) Ai(c) Jc(sb) H($2xl)">
        <div>
          <FormikInput
            label="Project name"
            name={`allPortfolios[${index}].project`}
            id={`project_${index}`}
            tabIndex={6 * index + 1}
            error={getError('project', index)}
            value={portfolio.project}
            onChange={handleChange}
          />
        </div>
        <div className="Mstart($2xl)">
          <FormikInput
            name={`allPortfolios[${index}].client`}
            id={`client_${index}`}
            label="Client"
            tabIndex={6 * index + 2}
            error={getError('client', index)}
            value={portfolio.client}
            onChange={handleChange}
          />
        </div>
      </div>
      <FormikInput
        label="Completion"
        name={`allPortfolios[${index}].completion`}
        placeholder="mm/yyyy"
        id={`completion_${index}`}
        tabIndex={6 * index + 3}
        autoComplete="off"
        dimensionClasses="W($15xl)"
        error={getError('completion', index)}
        value={portfolio.completion}
        onChange={handleChange}
      />
      <FormikTextArea
        label="Description"
        name={`allPortfolios[${index}].description`}
        id="description"
        heightClass="H($5xl)"
        placeholder="Brief description of your work"
        dimensionClasses="W($full) Mt($2xl)"
        tabIndex={6 * index + 6}
        onChange={handleChange}
        value={portfolio.description}
        error={getError('description', index)}
      />
      <Button
        {...removeProps}
        // onClick={setTimeout(, 300)}
        onClick={() => remove(index)}
      >
        Remove Project
      </Button>
    </div>
  );
};

const ExperienceCounter = ({ onNext, onBack, total, current }) => {
  if (total === 0 || !total) return null;
  return (
    <div className="D(f) Jc(c) Ai(c)">
      <BaseIcon
        icon="showmore"
        iconClasses={`W($xl) H($xl) Rotate(90deg) Bdrs($lg) ${
          current === 0 ? '' : 'Bgc($navBarBg):h'
        } Trsdu(0.4s) Trsp(a) Trstf(e)`}
        fill={current === 0 ? '#c6c6c6' : 'black'}
        onClick={onBack}
      />
      <div className="Ff($ffmanrope) Fz($smd) M($xxs)">
        {current + 1}/{total}
      </div>
      <BaseIcon
        icon="showmore"
        iconClasses={`W($xl) H($xl) Rotate(-90deg) Bdrs($lg) ${
          current === total - 1 ? '' : 'Bgc($navBarBg):h'
        } Trsdu(0.4s) Trsp(a) Trstf(e)`}
        fill={current === total - 1 ? '#c6c6c6' : 'black'}
        onClick={onNext}
      />
    </div>
  );
};

const PortfolioEditForm = ({ onCancel, portfolio, onSave }) => {
  const validationSchema = Yup.object().shape({
    allPortfolios: Yup.array().of(
      Yup.object().shape({
        project: Yup.string()
          .min(3, 'too short')
          .required('Required'),
        client: Yup.string().required('Required'),
        completion: Yup.string()
          .matches(
            /^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
            'Enter valid date mm/yyyy',
          )
          .required('Required'),
        description: Yup.string()
          .required('Required')
          .test('word-count-limit', 'Min 5 words and Max 100 words', value => {
            if (!value) return false;
            const l = wordCount(value);
            return l >= 5 && l <= 100;
          }),
      }),
    ),
  });

  const emptyPortfolio = {
    project: '',
    client: '',
    completion: '',
    description: '',
    images: [],
  };
  const allPortfolios = isEmpty(portfolio) ? [emptyPortfolio] : portfolio;
  const initialValues = {
    // allPortfolios: sortBy(portfolio, 'order'),
    // allPortfolios: [],
    allPortfolios,
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [forward, setForward] = useState(true);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values));
        onSave({ portfolio: values.allPortfolios });
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
        <div className={`Bdrs($xs) Bgc(white) H($fc) W($60xl)`}>
          <Form onSubmit={handleSubmit}>
            <FieldArray
              name="allPortfolios"
              render={({ remove, push, insert, unshift }) => (
                <>
                  <div className="D(f) Ai(c) Jc(sb) Fz($mmd) Lh(1) Px($lg) Py($xss) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
                    <div>Edit Portfolio</div>
                    <ExperienceCounter
                      total={values.allPortfolios.length}
                      current={currentIndex}
                      onNext={() => {
                        if (currentIndex !== values.allPortfolios.length - 1) {
                          setCurrentIndex(currentIndex + 1);
                          setTimeout(() => setForward(true), 600);
                        }
                      }}
                      onBack={() => {
                        if (currentIndex !== 0) {
                          setCurrentIndex(currentIndex - 1);
                          setTimeout(() => setForward(false), 600);
                        }
                      }}
                    />
                    <Button
                      {...addProps}
                      onClick={() => {
                        console.log('ADD FRIEND');
                        setTimeout(() => {
                          unshift(emptyPortfolio);
                          setCurrentIndex(0);
                        }, 300);
                      }}
                    >
                      Add +
                    </Button>
                  </div>
                  <div className="TranslateZ(0) Ov(h) W($60xl)">
                    <div
                      className="D(f) Pos(r) Trsdu(1.2s) Trsp(a) Trstf(e)"
                      style={{
                        transform: `translateX(${-1 * currentIndex * 600}px)`,
                      }}
                    >
                      {values.allPortfolios.map((portfolio, index) => (
                        <PortfolioFormCard
                          index={index}
                          portfolio={portfolio}
                          errors={errors}
                          touched={touched}
                          remove={remove}
                          currentIndex={currentIndex}
                          current={
                            currentIndex === index || forward
                              ? currentIndex === index - 1
                              : currentIndex === index + 1
                          }
                          handleChange={handleChange}
                          setFieldValue={setFieldValue}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={`D(f) Ai(c) Jc(c) W($60xl) Bdt($bdcardGrey)`}>
                    <Button {...cancelProps}>Cancel</Button>
                    <Button
                      {...activeSaveProps}
                      disabled={values.allPortfolios.length === 0}
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

PortfolioEditForm.propTypes = {
  onCancel: PropTypes.func,
  portfolio: PropTypes.array,
};

PortfolioEditForm.defaultProps = {
  onCancel: () => {},
};

export default PortfolioEditForm;
