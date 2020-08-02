import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import Button from 'components/molecules/Button';
import Modal from 'react-modal';
import DisplayCard from 'components/molecules/DisplayCard';
import isEmpty from 'lodash/isEmpty';
import times from 'lodash/times';
import Slider from 'react-slick';
import compact from 'lodash/compact';

const UI_STATES = {
  PERSONAL_DETAILS: 'PERSONAL_DETAILS',
  CONTACT_INFO: 'CONTACT_INFO',
  ABOUT_ME: 'ABOUT_ME',
  SKILLS: 'SKILLS',
  EXPERIENCE: 'EXPERIENCE',
  PORTFOLIO: 'PORTFOLIO',
};

const NEXT_STATES = {
  PERSONAL_DETAILS: 'CONTACT_INFO',
  CONTACT_INFO: 'ABOUT_ME',
  ABOUT_ME: 'SKILLS',
  SKILLS: 'EXPERIENCE',
  EXPERIENCE: 'PORTFOLIO',
};

const MESSAGES = {
  personal: {
    heading: 'My Details',
    subheading: 'Name, Profile picture, Profession, Location',
  },
  contact: {
    heading: 'Contact Information',
    subheading: 'Name, Profile picture, Profession, Location',
  },
  about: {
    heading: 'About Yourself',
    subheading: 'Name, Profile picture, Profession, Location',
  },
  skills: {
    heading: 'Skills',
    subheading: 'Name, Profile picture, Profession, Location',
  },
  experience: {
    heading: 'Experience',
    subheading: 'Name, Profile picture, Profession, Location',
  },
  portfolio: {
    heading: 'Portfolio',
    subheading: 'Name, Profile picture, Profession, Location',
  },
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}

const geCurrentState = profile => {
  const LOOKUP = {
    personal: 'PERSONAL_DETAILS',
    phone: 'CONTACT_INFO',
    about: 'ABOUT_ME',
    skills: 'SKILLS',
    experience: 'EXPERIENCE',
    portfolio: 'PORTFOLIO',
  };
  let currentState;

  const messageList = compact(
    [
      'personal',
      'about',
      'phone',
      'email',
      'experience',
      'portfolio',
      'skills',
    ].filter(info => isEmpty(profile[info])),
  ).map(info => MESSAGES[info]);

  console.log(messageList);

  for (const info in LOOKUP) {
    if (isEmpty(profile[info]) && !currentState) currentState = LOOKUP[info];
  }
  return { currentState, messageList };
};

const GetStartedForm = ({ profile }) => {
  const cancelProps = {
    iconDescription: 'Cancel',
    alignContent: 'center',
    kind: 'tertiary',
    size: '5x',
    type: 'button',
    roundCorners: false,
    onClick: () => {
      console.log('add me');
    },
  };
  const currentData = geCurrentState(profile);
  const [currentState, setCurrentState] = useState(currentData.currentState);
  // const RENDER_MESSAGES = MESSAGES[currentData.messageList];
  const msg = {
    heading: 'Contact Information',
    subheading: 'Name, Profile picture, Profession, Location',
  };
  const {
    personal,
    about,
    phone,
    email,
    experience,
    portfolio,
    skills,
  } = profile;
  const countEmpty = [
    personal,
    about,
    phone,
    portfolio,
    skills,
    experience,
  ].filter(isEmpty).length;
  const Dots = countEmpty > 1 && times(countEmpty);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <DisplayCard>
      <div className="Ff($ffmanrope)">
        <div>Lets build your profile</div>
        <div className="Ff($ffopensans)">Your profile is x % complete</div>
        <div>A complete profile increases your chances of being recognised</div>
      </div>
      <div className="D(f) Ai(c) Jc(c) Fld(c)">
        <BaseIcon icon="check" fill="gray" iconClasses="W($10x) H($10x)" />
        <Button {...cancelProps}>Add +</Button>
        <div className="W($45x) Ff($ffmanrope)">
          <Slider {...settings}>
            <div>
              <div>{msg.heading}</div>
              <div>{msg.subheading}</div>
            </div>
            <div>
              <div>{msg.heading}</div>
              <div>{msg.subheading}</div>
            </div>
            <div>
              <div>{msg.heading}</div>
              <div>{msg.subheading}</div>
            </div>
            <div>
              <div>{msg.heading}</div>
              <div>{msg.subheading}</div>
            </div>
            <div>
              <div>{msg.heading}</div>
              <div>{msg.subheading}</div>
            </div>
            <div>
              <div>{msg.heading}</div>
              <div>{msg.subheading}</div>
            </div>
          </Slider>
        </div>
      </div>
    </DisplayCard>
  );
};

export default GetStartedForm;
