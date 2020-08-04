import React from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const AboutMe = ({ about, onEdit }) => {
  if (isEmpty(about)) return null;
  return (
    <DisplayCard heading="About Me" topRightIcon="edit" onClickIcon={onEdit}>
      <div className="Ff($ffopensans) Fz($md) Lh(1.75)"> {about}</div>
    </DisplayCard>
  );
};

AboutMe.propTypes = {
  about: PropTypes.string,
  onEdit: PropTypes.func,
};

export default AboutMe;
