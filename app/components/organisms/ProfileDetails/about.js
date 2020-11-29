import React from 'react';
import DisplayCard from 'components/molecules/DisplayCard';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const AboutMe = ({ about, onEdit, viewOnly }) => {
  if (isEmpty(about)) return null;
  return (
    <DisplayCard
      heading="About Me"
      topRightIcon={!viewOnly ? 'edit' : ''}
      onClickIcon={onEdit}
    >
      <div className="Ff($ffopensans) Fz($md) Lh(1.75)"> {about}</div>
    </DisplayCard>
  );
};

AboutMe.propTypes = {
  about: PropTypes.string,
  onEdit: PropTypes.func,
  viewOnly: PropTypes.bool,
};

AboutMe.defaultProps = {
  viewOnly: false,
  onEdit: () => {},
};

export default AboutMe;
