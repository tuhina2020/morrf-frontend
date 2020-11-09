import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NestedFormikComboBox from 'components/molecules/FormikComboBox/nested';
import Tag from 'components/molecules/Tag';
import Button from 'components/molecules/Button';
import { Formik, Form } from 'formik';
import { isEmpty, values } from 'lodash';

const SkillEditForm = ({ onCancel, onSave, data: skills, allSkills }) => {
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
  const [focusComboBox, setFocus] = useState(false);
  return (
    <div className="Bdrs($xs) Bgc(white)">
      <div className="Fz($mmd) Lh(1) Px($lg) Pb($xss) Pt($md) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
        Edit Skills
      </div>
      <Formik
        initialValues={{ skills }}
        onSubmit={(values, { setSubmitting }) => {
          onSave(values);
          setSubmitting(false);
          onCancel();
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
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
                focusComboBox={focusComboBox}
              />
            </div>
            <div className="H($2xl) W($full)" />
            <div className="D(f) Ai(c) Jc(c) Bdt($bdcardGrey)">
              <Button {...cancelProps}>Cancel</Button>
              <Button {...saveProps}>Save</Button>
            </div>
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
};

SkillEditForm.defaultProps = {
  onCancel: () => {},
  allSkills: [],
};

export default SkillEditForm;
