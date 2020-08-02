import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import FormikComboBox from 'components/molecules/FormikComboBox/multi-select';
import Tag from 'components/molecules/Tag';
import { useFormik, Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash/isEmpty';

const SkillEditForm = ({
  onCancel,
  onSave,
  data: skills,
  allSkills,
  getFilteredSkills,
}) => {
  const [localSkills, setSkills] = useState(skills);
  const [search, setSearch] = useState('');

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

  const handleSubmit = e => {
    e.preventDefault();
    alert(search);
  };

  const onEnter = e => {
    if (event.key === 'Enter') {
      console.log('enter press here! ', search);
    }
  };

  const deleteSkill = skill => {
    const skills = localSkills.filter(skillObj => skillObj.id !== skill.id);
    setSkills(skills);
  };

  const addSkill = skill => {
    const skills = [...localSkills];
    skills.push(skill);
    setSkills(skills);
  };

  const initialValues = {
    skills,
    search: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values));
        onSave(values);
        setSubmitting(false);
        onCancel();
      }}
      // validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        handleSubmit,
        touched,
        errors,
      }) => {
        const getError = key => (key && errors[key] ? errors[key] : null);
        return (
          <Form onSubmit={handleSubmit}>
            <DisplayCard
              heading="Edit Skills"
              lastChildPadding={false}
              // childPadding="Px($lg) Py($md)"
              childPadding="Px($lg) Pb($lmg) Pt($md)"
            >
              <div>
                <div className="D(f) Ai(c) Jc(s) Mb($3xxl) Flw(w)">
                  {localSkills.map((skill, i) => (
                    <div className="Mend($sm) Mb($sm)" key={`i ${i}`}>
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
                {values.search}
                <div style={{ height: '400px', overflow: 'scroll' }}>
                  <FormikComboBox
                    id="search"
                    name="search"
                    type="text"
                    prependIcon="showmore"
                    onChange={handleChange}
                    value={values.search}
                    labelText="Select one or more skills"
                    // onKeyPress={onEnter}
                    onSelect={({ item, add }) => {
                      const newSkills = add
                        ? [...localSkills, item]
                        : localSkills.filter(sk => sk.id !== item.id);
                      setFieldValue('skills', newSkills);
                      setSkills(newSkills);
                      setSearch('');
                      setFieldValue('search', '');
                      getFilteredSkills({});
                    }}
                    onFilter={searchString => {
                      console.log(values.search);
                      setFieldValue('search', searchString);
                      getFilteredSkills({ search: searchString });
                    }}
                    items={allSkills}
                    selectedIds={localSkills.map(sk => sk.id)}
                    // error={getError('search')}
                    label="Select one or more skills"
                  />
                </div>
              </div>
              <div className="D(f) Ai(c) Jc(c)">
                <Button {...cancelProps}>Cancel</Button>
                <Button {...saveProps}>Save</Button>
              </div>
            </DisplayCard>
          </Form>
        );
      }}
    </Formik>
  );
};

SkillEditForm.propTypes = {
  onCancel: PropTypes.func,
  allSkills: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

SkillEditForm.defaultProps = {
  onCancel: () => {},
  allSkills: [],
};

export default SkillEditForm;
