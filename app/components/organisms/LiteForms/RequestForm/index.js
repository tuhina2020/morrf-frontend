import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import FormikInput from 'components/molecules/FormikInput';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { Formik } from 'formik';
import Input from 'components/molecules/Input/index';
import NestedFormikComboBox from 'components/molecules/FormikComboBox/nested';
import Tag from 'components/molecules/Tag';
import { wordCount } from 'utils/helper';
import SuccessAnimation from 'Assets/gifs/success.gif';
import Button from 'components/molecules/Button/index';
const generateRequestForm = ({
  setCallToggle,
  allProfessionTypes,
  isDesktopOrLaptop,
  setName,
}) => ({
  handleSubmit,
  handleChange,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  const getError = key =>
    key && errors[key] && touched[key] ? errors[key] : null;
  const submitProps = {
    iconDescription: 'submit',
    alignContent: 'center',
    kind: 'primary',
    type: 'submit',
  };

  const requestButtonProps = {
    iconDescription: 'callback',
    alignContent: 'center',
    kind: 'secondary',
    type: 'button',
    onClick: () => setCallToggle(true),
  };

  return (
    <form className="W($full) H($full)" onSubmit={handleSubmit}>
      <FormikInput
        dimensionClasses="W($full) H($2xl) Mb($sm)"
        label="Your name"
        name="name"
        id="name"
        tabIndex={1}
        onChange={e => {
          handleChange(e);
          setName(e.target.value);
        }}
        value={values.name}
        error={getError('name')}
      />
      <div className="W($full) Mb($sm)">
        <NestedFormikComboBox
          id="search"
          name="search"
          type="text"
          inline
          tabIndex={2}
          sliceInline={isDesktopOrLaptop ? 2 : 1}
          error={getError('specialist')}
          prependIcon="showmore"
          labelText={
            values.specialist.length === 0
              ? 'Design specialist you are looking for'
              : 'Looking For'
          }
          // onKeyPress={onEnter}
          onChange={useCallback(params => {
            setFieldValue('specialist', params);
          }, [])}
          items={allProfessionTypes}
          viewableValues={values.specialist}
        />
      </div>
      <FormikTextArea
        dimensionClasses="W($full) Mb($sm)"
        heightClass="H($10x)"
        placeholder="Brief description of the job"
        name="description"
        id="description"
        tabIndex={3}
        onChange={handleChange}
        value={values.description}
        error={getError('description')}
      />
      <FormikInput
        dimensionClasses="W($full) H($2xl) Mb($sm)"
        label="Job budget in INR"
        name="budget"
        id="budget"
        tabIndex={4}
        onChange={handleChange}
        value={values.budget}
        error={getError('budget')}
      />
      <FormikInput
        dimensionClasses="W($full) H($2xl) Mb($sm)"
        label="Your email address"
        name="email"
        id="email"
        tabIndex={5}
        onChange={handleChange}
        value={values.email}
        error={getError('email')}
      />
      <div
        className={
          isDesktopOrLaptop ? 'Mx(a) Mt($sm) W(fc)' : 'Mx(a) Mt($lg) W(fc)'
        }
      >
        <Button {...submitProps}>Submit Request</Button>
      </div>
      <div className="My($lg) D(f) Ai(c) Jc(c) Mx(a) W(60%)">
        <div className="H(1px) W($half) Bgc($hoverInput)" />
        <div className="W(40px) Ff($ffmanrope) Fz($smd) Ta(c)">or</div>
        <div className="H(1px) W($half) Bgc($hoverInput)" />
      </div>
      <div className="Mx(a) W(fc)">
        <Button {...requestButtonProps}>Request a Callback</Button>
      </div>
    </form>
  );
};

const RequestForm = props => {
  const {
    setCallToggle,
    isDesktopOrLaptop,
    allProfessionTypes,
    sendEmail,
    setName,
    initName,
  } = props;

  const YupObj = {
    name: Yup.string()
      .matches(/^[a-zA-Z ]*$/, 'Numbers not allowed')
      .min(3, 'Enter atleast 3 letters')
      .required('Required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Required'),
    description: Yup.string()
      .test('word-count-limit', 'Enter atleast 10 words', value => {
        if (!value) return false;
        const l = wordCount(value);
        return l >= 10 && l <= 100;
      })
      .required('Required'),
    budget: Yup.number()
      .integer('Enter amount')
      .min(1000, 'Enter atleast 1000')
      .required('Required'),
    specialist: Yup.array().required('Required'),
  };

  const validationSchema = Yup.object(YupObj);

  const initialValues = {
    name: initName,
    specialist: [],
    description: '',
    budget: '',
    email: '',
  };
  const [submitted, setSubmitted] = useState(false);
  const [submitCount, setCount] = useState(0);
  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
    }
  }, [submitted]);
  const anotherReqButton = {
    iconDescription: 'again',
    alignContent: 'center',
    kind: 'secondary',
    type: 'button',
    onClick: () => setCount(0),
  };

  const NewRequestButton = () => (
    <div
      className={
        'Mx(a) W(fc) Pos(r) Trsdu(1s) Trstf(e) Trsp(a) ' +
        (submitted ? 'H(fc)' : 'T($20x) H($50xl)')
      }
    >
      <Button {...anotherReqButton}>Submit Another response</Button>
    </div>
  );

  return (
    <div
      className={`${
        isDesktopOrLaptop ? 'W(530px)' : 'W(320px)'
      } H(a) Bgc(white) Bxsh($bxshhighlight) M(a) Bdrs($xs) P($lg)`}
    >
      {submitted && submitCount === 1 ? (
        <img src={SuccessAnimation} className="W($full)" />
      ) : submitCount === 0 ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            sendEmail(values);
            setName('');
            resetForm({
              values: {
                ...initialValues,
                name: '',
              },
            });
            setCount(1);
            setSubmitted(true);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {generateRequestForm({
            setCallToggle,
            allProfessionTypes,
            isDesktopOrLaptop,
            setName,
          })}
        </Formik>
      ) : null}
      {submitCount > 0 ? <NewRequestButton /> : null}
    </div>
  );
};

RequestForm.propTypes = {
  setCallToggle: PropTypes.func,
  isDesktopOrLaptop: PropTypes.bool,
  name: PropTypes.string,
  setName: PropTypes.func,
};

RequestForm.defaultProps = {
  isDesktopOrLaptop: true,
  setCallToggle: () => {},
};

export default RequestForm;
