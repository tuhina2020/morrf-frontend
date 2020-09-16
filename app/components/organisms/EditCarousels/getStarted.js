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

const MESSAGES = {
  personal: {
    heading: 'My Details',
    subheading: 'Name, Profile picture, Profession, Location',
    add: 'personal',
    reason: 'Your phone number is essential in making your work faster.',
  },
  contact: {
    heading: 'Contact Information',
    subheading: 'Phone number',
    add: 'contact',
    reason: 'Your phone number is essential in making your work faster.',
  },
  about: {
    heading: 'About Yourself',
    add: 'about',
    subheading: 'Name, Profile picture, Profession, Location',
    reason: 'Tell us something about yourself',
  },
  skills: {
    heading: 'Skills',
    add: 'skills',
    subheading: 'Please update your skills',
    reason: 'Skills paint a good picture of your profile to your clients',
  },
  experience: {
    heading: 'Experience',
    add: 'experience',
    subheading: 'Please update your experience for more visibility',
    reason: 'This will give you higher visibility',
  },
  portfolio: {
    heading: 'Portfolio',
    add: 'portfolio',
    subheading: 'Add your portfolio for points',
    reason: 'Portfolio of all the start projects to showcase your skills',
  },
};

const GetStartedForm = ({ data, onClickAdd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let countEmpty = 0;
  const filteredMessages = [];
  const { personal, about, phone, email, experience, portfolio, skills } = data;
  Object.keys(data).forEach(key => {
    if (isEmpty(data[key]) && !isEmpty(MESSAGES[key])) {
      filteredMessages.push(MESSAGES[key]);
      countEmpty++;
    }
  });

  const percentage = ((6 - countEmpty) * 100) / 6.0;
  const total = filteredMessages.length;
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
      const currentPage = filteredMessages[currentIndex].add;
      onClickAdd(currentPage);
    },
  };

  return (
    <DisplayCard>
      <div className="Ff($ffmanrope) Lh(1)">
        <div className="Fz($mmd) Fw($fwbold)">Lets build your profile</div>
        <div className="Ff($ffopensans) Fz($sm) Mt($xs) Mb($sm)">
          Your profile is {percentage.toFixed(1)} % complete
        </div>
        <div className="Fz($sm) C($inputGrey)">
          A complete profile increases your chances of being recognised
        </div>
      </div>
      <div>
        <BaseIcon
          icon="check"
          fill="gray"
          iconClasses="W($10x) H($10x) Mx(a) D(b)"
        />
        <div className="Mx(a) W(fc)">
          <Button {...addProps}>Add +</Button>
        </div>

        <div className="D(f) Jc(c) Ai(c) Ff($ffmanrope)">
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
              {filteredMessages.map(msg => (
                <div className="W($45x) Ta(c)" key={msg.add}>
                  <div className="Fz($smx)">{msg.heading}</div>
                  <div className="Fz($sm) Mb($lg)">{msg.subheading}</div>
                  <div className="Fz($sm)">{msg.reason || ''}</div>
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
