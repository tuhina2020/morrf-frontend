import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import FormikInput from 'components/molecules/FormikInput';
import FormikTextArea from 'components/molecules/FormikTextArea';
import { Form, Formik } from 'formik';
import Input from '../../../molecules/Input/index';
import NestedFormikComboBox from 'components/molecules/FormikComboBox/nested';
import Tag from 'components/molecules/Tag';

import Button from '../../../molecules/Button/index';
const getDesktopForm = ({
  setCallBackForm,
  viewableSpecialist,
  setViewableSpecialist,
  specialistList,
  selectObj,
  deleteSkill,
}) => ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  validateField,
  validateForm,
  setFieldError,
}) => {
  const getError = key => (key && errors[key] ? errors[key] : null);

  return (
    <div className="W(540px) H(a) Bgc(white) Bxsh($bxshhighlight) M(a) Bdrs($xs) P($lg) O(1)">
      <form
        className="D(f) Fld(c) W($full) H($full) Ai(fs) Jc(fs)"
        onSubmit={handleSubmit}
      >
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($sm)"
          label="Your name"
          name="name"
          id="name"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          error={getError('phone')}
        />
        <div className="W($full) Mb($sm)">
          <div className="D(f) Ai(c) Jc(s) Flw(w)">
            {viewableSpecialist.map(skill => (
              <div className="Mend($sm) Mb($sm)" key={skill.id}>
                <Tag
                  filter
                  disabled={false}
                  onDelete={() => deleteSkill(skill)}
                >
                  {skill.name}
                </Tag>
              </div>
            ))}
          </div>
          <NestedFormikComboBox
            className="H($2xl)"
            id="search"
            name="search"
            type="text"
            prependIcon="showmore"
            labelText="Design specialist you are looking for"
            // onKeyPress={onEnter}
            onSelect={selectObj}
            items={specialistList}
            values={viewableSpecialist.map(sk => sk.id)}
            label="Design specialist you are looking for"
          />
        </div>
        <FormikTextArea
          dimensionClasses="W($full) Mb($sm)"
          heightClass="H($10x)"
          placeholder="Brief description of the job"
          name="description"
          id="description"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.description}
          error={getError('description')}
        />
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($sm)"
          label="Job budget in INR"
          name="budget"
          id="budget"
          tabIndex={1}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.budget}
          error={getError('budget')}
        />
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($sm)"
          label="Your email address"
          name="email"
          id="email"
          tabIndex={1}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={getError('email')}
        />

        <Button type="submit" classes="Mx(a) My($sm)">
          Submit Request
        </Button>
        <div className="D(f) Fld(r) W($half) Mx(a) My($sm)">
          <hr className="W(40%) O(0.5)" />
          or
          <hr className="W(40%) O(0.5)" />
        </div>
        <Button
          type="button"
          onClick={() => {
            setCallBackForm(true);
          }}
          kind="secondary"
          classes="Mx(a) Mt($sm)"
        >
          Request a Callback
        </Button>
      </form>
    </div>
  );
};

const getMobileForm = ({
  setCallBackForm,
  viewableSpecialist,
  setViewableSpecialist,
  specialistList,
  selectObj,
  deleteSkill,
}) => ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  validateField,
  validateForm,
  setFieldError,
}) => {
  const getError = key => (key && errors[key] ? errors[key] : null);

  return (
    <div className="W(540px) H(a) Bgc(white) Bxsh($bxshhighlight) M(a) Bdrs($xs) P($lg) O(1)">
      <form
        className="D(f) Fld(c) W($full) H($full) Ai(fs) Jc(fs)"
        onSubmit={handleSubmit}
      >
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($sm)"
          label="Your name"
          name="name"
          id="name"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          error={getError('phone')}
        />
        <div className="W($full) Mb($sm)">
          <div className="D(f) Ai(c) Jc(s) Flw(w)">
            {viewableSpecialist.map(skill => (
              <div className="Mend($sm) Mb($sm)" key={skill.id}>
                <Tag
                  filter
                  disabled={false}
                  onDelete={() => deleteSkill(skill)}
                >
                  {skill.name}
                </Tag>
              </div>
            ))}
          </div>
          <NestedFormikComboBox
            className="H($2xl)"
            id="search"
            name="search"
            type="text"
            prependIcon="showmore"
            labelText="Design specialist you are looking for"
            // onKeyPress={onEnter}
            onSelect={selectObj}
            items={specialistList}
            values={viewableSpecialist.map(sk => sk.id)}
            label="Design specialist you are looking for"
          />
        </div>
        <FormikTextArea
          dimensionClasses="W($full) Mb($sm)"
          heightClass="H($10x)"
          placeholder="Brief description of the job"
          name="description"
          id="description"
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.description}
          error={getError('description')}
        />
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($sm)"
          label="Job budget in INR"
          name="budget"
          id="budget"
          tabIndex={1}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.budget}
          error={getError('budget')}
        />
        <FormikInput
          dimensionClasses="W($full) H($2xl) Mb($sm)"
          label="Your email address"
          name="email"
          id="email"
          tabIndex={1}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={getError('email')}
        />

        <Button type="submit" classes="Mx(a) My($sm)">
          Submit Request
        </Button>
        <div className="D(f) Fld(r) W($half) Mx(a) My($sm)">
          <hr className="W(40%) O(0.5)" />
          or
          <hr className="W(40%) O(0.5)" />
        </div>
        <Button
          type="button"
          onClick={() => {
            setCallBackForm(true);
          }}
          kind="secondary"
          classes="Mx(a) Mt($sm)"
        >
          Request a Callback
        </Button>
      </form>
    </div>
  );
};

const RequestForm = props => {
  const [viewableSpecialist, setViewableSpecialist] = useState([]);
  const { setCallBackForm, isDesktopOrLaptop, specialistList } = props;

  const YupObj = {
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Required'),
    description: Yup.string().required('Required'),
    budget: Yup.number()
      .integer('Enter amount')
      .required('Required'),
  };

  const validationSchema = Yup.object(YupObj);

  const selectObj = ({ item, add }) => {
    const newSpecialist = add
      ? [...viewableSpecialist, item]
      : viewableSpecialist.filter(sk => sk.id !== item.id);
    setViewableSpecialist(newSpecialist);
  };

  const deleteSkill = skill => {
    selectObj({
      item: skill,
      add: false,
    });
  };
  const initialValues = {
    name: '',
    specialist: [],
    description: '',
    budget: '',
    email: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        (values.specialist = [...viewableSpecialist]), console.log(values);
        alert(JSON.stringify(values));
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {isDesktopOrLaptop
        ? getDesktopForm({
            setCallBackForm,
            viewableSpecialist,
            setViewableSpecialist,
            specialistList,
            selectObj,
            deleteSkill,
          })
        : getMobileForm(setCallBackForm)}
    </Formik>
  );
};

RequestForm.propTypes = {
  setCallBackForm: PropTypes.func,
  isDesktopOrLaptop: PropTypes.bool,
};

RequestForm.defaultProps = {
  isDesktopOrLaptop: true,
  setCallBackForm: () => {},
};

export default RequestForm;
