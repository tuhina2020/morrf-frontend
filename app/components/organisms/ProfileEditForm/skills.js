import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import NestedFormikComboBox from 'components/molecules/FormikComboBox/nested';
import Tag from 'components/molecules/Tag';
import Button from 'components/molecules/Button';
import { Formik, Form } from 'formik';
import isEmpty from 'lodash/isEmpty';

const SkillEditForm = ({
  onCancel,
  onSave,
  data: skills,
  allSkills,
  getFilteredSkills,
}) => {
  const [viewableSkills, setViewableSkills] = useState(skills);

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

  const selectObj = ({ item, add }) => {
    const newSkills = add
      ? [...viewableSkills, item]
      : viewableSkills.filter(sk => sk.id !== item.id);
    setViewableSkills(newSkills);
  };

  const deleteSkill = skill => {
    selectObj({
      item: skill,
      add: false,
    });
  };

  // const handleSubmit = () => {
  //   alert(JSON.stringify(viewableSkills));
  //   onSave({ skills: viewableSkills });
  //   onCancel();
  // };

  return (
    <Formik
      initialValues={{ skills: [] }}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(viewableSkills));
        onSave({ skills: viewableSkills });
        setSubmitting(false);
        onCancel();
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <DisplayCard
            heading="Edit Skills"
            lastChildPadding={false}
            childPadding="Px($lg) Pb($lmg) Pt($md)"
          >
            <div>
              <div className="D(f) Ai(c) Jc(s) Mb($3xxl) Flw(w)">
                {viewableSkills.map((skill, i) => (
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
              <NestedFormikComboBox
                id="search"
                name="search"
                type="text"
                prependIcon="showmore"
                labelText="Select one or more skills"
                // onKeyPress={onEnter}
                onSelect={selectObj}
                items={allSkills}
                values={viewableSkills.map(sk => sk.id)}
                label="Select one or more skills"
              />
            </div>
            <div className="D(f) Ai(c) Jc(c)">
              <Button {...cancelProps}>Cancel</Button>
              <Button {...saveProps}>Save</Button>
            </div>
          </DisplayCard>
        </Form>
      )}
    </Formik>
  );
};

SkillEditForm.propTypes = {
  onCancel: PropTypes.func,
  allSkills: PropTypes.array,
};

SkillEditForm.defaultProps = {
  onCancel: () => {},
  allSkills: [],
};

export default SkillEditForm;
