import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import NestedFormikComboBox from 'components/molecules/FormikComboBox/nested';
import Tag from 'components/molecules/Tag';
import Button from 'components/molecules/Button';
import { Formik, Form } from 'formik';
import { isEmpty, values } from 'lodash';

const SkillEditForm = ({
  onCancel,
  onSave,
  data: skills,
  allSkills,
  // getFilteredSkills,
}) => {
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
  return (
    <div className="Bdrs($xs) Bgc(white)">
      <div className="Fz($mmd) Lh(1) Px($lg) Py($xss) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
        Edit Skills
      </div>
      <Formik
        initialValues={{ skills }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          onSave(values);
          setSubmitting(false);
          onCancel();
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            {/* <DisplayCard
            heading="Edit Skills"
            lastChildPadding={false}
            childPadding="P($lg)"
          > */}
            <div className="P($lg)">
              <NestedFormikComboBox
                id="search"
                name="search"
                type="text"
                labelText="Select skills"
                // sliceInline={isDesktopOrLaptop ? 2 : 1}
                prependIcon="showmore"
                // onKeyPress={onEnter}
                onChange={params => {
                  setFieldValue('skills', params);
                }}
                items={allSkills}
                viewableValues={values.skills}
              />
            </div>
            <div className="D(f) Ai(c) Jc(c) Bdt($bdcardGrey)">
              <Button {...cancelProps}>Cancel</Button>
              <Button {...saveProps}>Save</Button>
            </div>
            {/* </DisplayCard> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

SkillEditForm.propTypes = {
  onCancel: PropTypes.func,
  allSkills: PropTypes.array,
  onSave: PropTypes.func,
  data: PropTypes.array,
  getFilteredSkills: PropTypes.func,
};

SkillEditForm.defaultProps = {
  onCancel: () => {},
  allSkills: [],
};

export default SkillEditForm;
