import React from 'react';
import PropTypes from 'prop-types';
import AboutEditForm from 'components/organisms/ProfileEditForm/about';
import PersonalEditForm from 'components/organisms/ProfileEditForm/personal';
import ContactEditForm from 'components/organisms/ProfileEditForm/contact';
import SkillEditForm from 'components/organisms/ProfileEditForm/skills';
import ExperienceEditForm from 'components/organisms/ProfileEditForm/ExperienceEdit';
import PortfolioEditForm from 'components/organisms/ProfileEditForm/PortfolioEdit';
import GetStartedForm from 'components/organisms/EditCarousels/getStarted';
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
      return <PersonalEditForm {...props} />;
    case 'contact':
      return <ContactEditForm {...props} />;
    case 'skills':
      return <SkillEditForm {...props} />;
    case 'experience':
    case 'editExperience':
      return <ExperienceEditForm {...props} />;
    case 'portfolio':
    case 'editPortfolio':
      return <PortfolioEditForm {...props} />;
    case 'getstarted':
      return <GetStartedForm {...props} />;
    default:
      return null;
  }
};

EditFormModal.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.string,
};

export default EditFormModal;
