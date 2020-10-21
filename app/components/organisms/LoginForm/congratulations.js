import React from 'react';
import Button from 'components/molecules/Button';
import GenericMessage from './genericMsg';
import PropTypes from 'prop-types';

const CongratulationsScreen = ({ setUserChoice }) => {
  const buttonDisplayProps = {
    iconDescription: 'Sign In',
    alignContent: 'center',
    kind: 'secondary',
    size: 'fc',
    tabIndex: 2,
  };
  return (
    <div>
      <GenericMessage
        line2="What brings you to Morff?"
        line1="One last question before we are all set to go"
      />
      <div className="W(fc) Mx(a) Mb($xl)">
        <Button
          {...buttonDisplayProps}
          onClick={() => setUserChoice({ role: 'freelancer' })}
        >
          I am a designer looking for freelance work
        </Button>
      </div>
      <div className="W(fc) Mx(a) Pt($xl) Bdt($bdsolidLightestGray)">
        <Button
          {...buttonDisplayProps}
          onClick={() => setUserChoice({ role: 'business' })}
        >
          I want to hire a freelance designer
        </Button>
      </div>
    </div>
  );
};

CongratulationsScreen.propTypes = {
  setUserChoice: PropTypes.func,
};

export default CongratulationsScreen;
