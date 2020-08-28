import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import Button from 'components/molecules/Button';
import Modal from 'react-modal';
import DisplayCard from 'components/molecules/DisplayCard';
import isEmpty from 'lodash/isEmpty';
import times from 'lodash/times';
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

const MESSAGES = [
  {
    heading: 'My Details',
    subheading: 'Name, Profile picture, Profession, Location',
    add: 'personal',
    reason: 'Your phone number is essential in making your work faster.',
  },
  {
    heading: 'Contact Information',
    subheading: 'Phone number',
    add: 'contact',
    reason: 'Your phone number is essential in making your work faster.',
  },
  {
    heading: 'About Yourself',
    add: 'about',
    subheading: 'Name, Profile picture, Profession, Location',
  },
  {
    heading: 'Skills',
    add: 'skills',
    subheading: 'Please update your skills',
  },
  {
    heading: 'Experience',
    add: 'experience',
    subheading: 'Please update your experience for more visibility',
  },
  {
    heading: 'Portfolio',
    add: 'portfolio',
    subheading: 'Add your portfolio for points',
  },
];

const GetStartedForm = ({ data, onClickAdd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = MESSAGES.length;
  const onNext = () => {
    if (currentIndex === total - 1) return;
    setTimeout(() => setCurrentIndex(currentIndex + 1), 600);
  };
  const onBack = () => {
    if (currentIndex === 0) return;
    setTimeout(() => setCurrentIndex(currentIndex - 1), 600);
  };
  const addProps = {
    iconDescription: 'Cancel',
    alignContent: 'center',
    kind: 'tertiary',
    size: '5x',
    type: 'button',
    roundCorners: false,
    onClick: () => {
      console.log('add me');
      const currentPage = MESSAGES[currentIndex].add;
      onClickAdd(currentPage);
    },
  };
  const { personal, about, phone, email, experience, portfolio, skills } = data;
  const countEmpty = [
    personal,
    about,
    phone,
    portfolio,
    skills,
    experience,
  ].filter(isEmpty).length;

  return (
    <DisplayCard>
      <div className="Ff($ffmanrope)">
        <div>Lets build your profile</div>
        <div className="Ff($ffopensans)">Your profile is x % complete</div>
        <div>A complete profile increases your chances of being recognised</div>
      </div>
      <div className="">
        <BaseIcon
          icon="check"
          fill="gray"
          iconClasses="W($10x) H($10x) Mx(a) D(b)"
        />
        <div className="Mx(a) W(fc)">
          <Button {...addProps}>Add +</Button>
        </div>

        <div className="D(f) Jc(fs) Ai(c) Ff($ffmanrope)">
          <BaseIcon
            icon="showmore"
            iconClasses={`W($xl) H($xl) Rotate(90deg) Bdrs($lg) ${
              currentIndex === 0
                ? 'C($hoverInput)'
                : 'Bgc($navBarBg):h C($inputGrey)'
            } Trsdu(0.4s) Trsp(a) Trstf(e)`}
            onClick={onBack}
          />
          <div className="W($45x) TranslateZ(0) Ov(h)">
            <div
              className="D(f) Ai(c) W(fc) Jc(fs) Trsdu(1s) Trsp(a) Trstf(e)"
              style={{
                transform: `translateX(${-1 * currentIndex * 450}px)`,
              }}
            >
              {MESSAGES.map(msg => (
                <div className="W($45x)" key={msg.add}>
                  <div>{msg.heading}</div>
                  <div>{msg.subheading}</div>
                  <div>{msg.reason || ''}</div>
                </div>
              ))}
            </div>
          </div>
          <BaseIcon
            icon="showmore"
            iconClasses={`W($xl) H($xl) Rotate(-90deg) Bdrs($lg) ${
              currentIndex === total - 1
                ? 'C($hoverInput)'
                : 'Bgc($navBarBg):h C($inputGrey)'
            } Trsdu(0.4s) Trsp(a) Trstf(e)`}
            onClick={onNext}
          />
        </div>
      </div>
    </DisplayCard>
  );
};

GetStartedForm.defaultProps = {
  data: {},
};

export default GetStartedForm;
