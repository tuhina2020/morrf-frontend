import React, { useState } from 'react';
import AboutEditForm from 'components/organisms/ProfileEditForm/about';
import ProfileEditForm from 'components/organisms/ProfileEditForm/personal';
import ContactEditForm from 'components/organisms/ProfileEditForm/contact';
import SkillEditForm from 'components/organisms/ProfileEditForm/skills';

const EditFormModal = ({ data, onSave, onCancel, open, ...extraProps }) => {
  const props = {
    ...extraProps,
    onSave,
    onCancel,
    data,
  };
  switch (open) {
    case 'about':
      return <AboutEditForm {...props} />;
    case 'personal':
      return <ProfileEditForm {...props} />;
    case 'contact':
      return <ContactEditForm {...props} />;
    case 'skills':
      return <SkillEditForm {...props} />;
    default:
      return null;
  }
};

export default EditFormModal;
