import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import Button from 'components/molecules/Button';
import Modal from 'react-modal';
import DisplayCard from 'components/molecules/DisplayCard';
import isEmpty from 'lodash/isEmpty';
import times from 'lodash/times';
import compact from 'lodash/compact';
import { isObject } from 'lodash';
import { pick } from 'lodash';
import { clean } from 'utils/helper';
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
    reason: 'This is how we recognise and address you',
    image:
      'https://morff-profile.s3-ap-southeast-1.amazonaws.com/images/details.png',
  },
  contact: {
    heading: 'Contact Information',
    subheading: 'Phone no',
    add: 'contact',
    reason: 'These details make it easier to reach out to you.',
    image:
      'https://morff-profile.s3-ap-southeast-1.amazonaws.com/images/phone.png',
  },
  about: {
    heading: 'About Yourself',
    add: 'about',
    subheading: 'Short note about yourself',
    reason: 'A short and sweet pitch about yourself',
    image: '',
  },
  skills: {
    heading: 'Skills',
    add: 'skills',
    subheading: 'Industry, Skills sets',
    reason: "Helps us match your profile to the clients' requirements",
    image:
      'https://morff-profile.s3-ap-southeast-1.amazonaws.com/images/skill.png',
  },
  experience: {
    heading: 'Experience',
    add: 'experience',
    subheading: 'Place(s) you worked at, Duration, Positions held',
    reason: 'Provides an opportunity to show your expertise',
    image:
      'https://morff-profile.s3-ap-southeast-1.amazonaws.com/images/experience.png',
  },
  portfolio: {
    heading: 'Portfolio',
    add: 'portfolio',
    subheading: 'Projects and Details',
    reason: 'Put your best work forward',
    image:
      'https://morff-profile.s3-ap-southeast-1.amazonaws.com/images/portfolio.png',
  },
};

let deepEmpty = obj => {
  return compact(pick(obj, ['firstName', 'lastName'])).length < 2;
};

const getFilteredMsg = ({ data, addProps }) => {
  const filteredMessages = [];
  let countEmpty = 0;
  const { personal, about, phone, email, experience, portfolio, skills } = data;
  Object.keys(data).forEach(key => {
    if (key !== 'personal' && isEmpty(data[key]) && !isEmpty(MESSAGES[key])) {
      filteredMessages.push(MESSAGES[key]);
      countEmpty++;
    } else if (!isEmpty(MESSAGES[key])) {
      const testObj = clean(data.personal);
      if (!testObj.firstName && !testObj.lastName) {
        filteredMessages.push(MESSAGES[key]);
        countEmpty++;
      }
    }
  });
  return { filteredMessages, countEmpty };
};

const GetFilteredMsgBody = ({ filteredMessages }) => {
  // debugger;
  return filteredMessages.map(msg => (
    <div key={msg.add} className="Mt($lg)">
      <div className="D(f) Ai(c) Jc(c)">
        <div
          className="W($10x) H($10x)"
          style={{
            backgroundImage: `url(${msg.image})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
      <div className="W($45x) Ta(c) Mb($4xl)">
        <div className="Fz($smx)">{msg.heading}</div>
        <div className="Fz($sm) Mb($sm)">{msg.subheading}</div>
        <div className="My($sm) H(1px) W($full) Bgc($disabledGrey2)" />
        <div className="Fz($sm)">{msg.reason || ''}</div>
      </div>
    </div>
  ));
};

const GetStartedForm = ({ data, onClickAdd, closeDialog }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const addProps = {
    iconDescription: 'Cancel',
    alignContent: 'center',
    kind: 'tertiary',
    size: '3xxl',
    type: 'button',
    roundCorners: false,
    onClick: () => {
      const currentPage = filteredMessages[currentIndex].add;
      console.log('add me', currentPage);
      onClickAdd(currentPage);
    },
  };
  const { filteredMessages, countEmpty } = useMemo(
    () => getFilteredMsg({ data }),
    [data],
  );

  const percentage = ((6 - countEmpty) * 100) / 6.0;
  if (percentage === 100) {
    closeDialog();
    return null;
  }
  const total = filteredMessages.length;
  const onNext = () => {
    if (currentIndex === total - 1) return;
    setCurrentIndex(currentIndex + 1);
  };
  const onBack = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="Bgc(white) Bdrs($xs) Bgc(white) H($fc) Maw($60xl)">
      <div className="Ff($ffmanrope) Lh(1) Px($lg) Py($sm) Bdb($bdcardGrey)">
        <div className="Fz($mmd) Fw($fwbold)">Lets build your profile</div>
        {/* <div className="D(f) Jc(s) Ai(c)"> */}
        <div className="Ff($ffopensans) Fz($sm) Mt($xs) Mb($sm) Mend($lg)">
          Your profile is {percentage.toFixed(1)} % complete
        </div>
        {/* <div className="H(1px) W($10x) Bgc(black)" />
        </div> */}

        <div className="Fz($sm) C($inputGrey)">
          A complete profile increases your chances of being recognised
        </div>
      </div>
      <div>
        {/* <BaseIcon
          icon="check"
          fill="gray"
          iconClasses="W($10x) H($10x) Mx(a) D(b)"
        /> */}

        <div className="D(f) Jc(c) Ai(fs) Ff($ffmanrope)">
          <BaseIcon
            icon="showmore"
            iconClasses={`W($xl) H($xl) Rotate(90deg) Bdrs($lg) ${
              currentIndex === 0
                ? 'C($hoverInput)'
                : 'Bgc($navBarBg):h C($inputGrey)'
            } Trsdu(0.4s) Trsp(a) Trstf(e) Mt($10x)`}
            onClick={onBack}
          />
          <div className="W($45x) TranslateZ(0) Ov(h)">
            <div
              className="Trsdu(0.4s) Trsp(a) Trstf(e)"
              style={{
                transform: `translateX(${-1 * currentIndex * 450}px)`,
              }}
            >
              <div key="abc" className="D(f) Ai(c) W(fc) Jc(fs)">
                {filteredMessages.map(msg => (
                  <div key={msg.add} className="Mt($lg)">
                    <div className="D(f) Ai(c) Jc(c)">
                      <div
                        className="W($10x) H($10x)"
                        style={{
                          backgroundImage: `url(${msg.image})`,
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    </div>
                    <div className="Mx(a) W(fc) My($sm)">
                      <Button {...addProps}>Add +</Button>
                    </div>
                    <div className="W($45x) Ta(c) Mb($4xl)">
                      <div className="Fz($smx)">{msg.heading}</div>
                      <div className="Fz($sm)">{msg.subheading}</div>
                      <div className="My($sm) H(1px) W($full) Bgc($disabledGrey2)" />
                      <div className="Fz($sm)">{msg.reason || ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <BaseIcon
            icon="showmore"
            iconClasses={`W($xl) H($xl) Rotate(-90deg) Bdrs($lg) ${
              currentIndex === total - 1
                ? 'C($hoverInput)'
                : 'Bgc($navBarBg):h C($inputGrey)'
            } Trsdu(0.4s) Trsp(a) Trstf(e) Mt($10x)`}
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};

GetStartedForm.defaultProps = {
  data: {},
};

export default GetStartedForm;
