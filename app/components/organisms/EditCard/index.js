import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import Button from 'components/molecules/Button';

const TwoActionButtons = ({ onCancel, onSave }) => {
  const saveProps = {
    iconDescription: 'Save',
    alignContent: 'center',
    kind: 'primary',
    size: 'half',
    roundCorners: false,
    onClick: onSave,
  };
  const cancelProps = {
    iconDescription: 'Cancel',
    alignContent: 'center',
    kind: 'tertiary',
    size: 'half',
    roundCorners: false,
    onClick: onCancel,
  };
  return (
    <div className="D(f) Ai(c) Jc(c)">
      <Button {...cancelProps}>Cancel</Button>
      <Button {...saveProps}>Save</Button>
    </div>
  );
};

const EditCard = ({ heading, children, onCancel, onSave, childPadding }) => {
  return (
    <DisplayCard
      heading={heading}
      childPadding={childPadding}
      lastChildPadding={false}
    >
      {children}
      <TwoActionButtons onCancel={onCancel} onSave={onSave} />
    </DisplayCard>
  );
};

EditCard.propTypes = {
  heading: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  childPadding: PropTypes.string,
};

EditCard.defaultProps = {
  onSave: () => {
    console.log('saved');
  },
  onCancel: () => {
    console.log('cancelled');
  },
  childPadding: 'P($lg)',
};

export default EditCard;
