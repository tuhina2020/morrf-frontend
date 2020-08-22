import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PersonalDetails from 'components/organisms/ProfileDetails/personal';
import AboutMe from 'components/organisms/ProfileDetails/about';
import Contact from 'components/organisms/ProfileDetails/contact';
import Experience from 'components/organisms/ProfileDetails/experience';
import Portfolio from 'components/organisms/ProfileDetails/portfolio';
import Skills from 'components/organisms/ProfileDetails/skills';
import GetStarted from 'components/organisms/EditCarousels';
import isEmpty from 'lodash/isEmpty';
import Modal from 'react-modal';
import EditFormModal from './editModal';

const ProfileDetails = ({
  profile,
  sendCode,
  getFilteredSkills,
  saveFunctionMap,
}) => {
  const {
    personal,
    about,
    phone,
    email,
    experience,
    portfolio,
    skills,
    getAllSkills,
  } = profile;

  const countEmptyLarge = [
    // personal,
    // about,
    // phone,
    portfolio,
    skills,
    experience,
  ].filter(isEmpty).length;
  const [open, setOpen] = useState('');
  const [currentIndex, setIndex] = useState();
  Modal.setAppElement('#app');
  const onCancel = () => setOpen('');
  const extraProps = {
    getFilteredSkills: open === 'skills' ? getFilteredSkills : undefined,
    allSkills: open === 'skills' ? getAllSkills : undefined,
    onSendCode: open === 'contact' ? sendCode : undefined,
    currentIndex:
      open === 'portfolio' || open === 'experience' ? currentIndex : undefined,
  };
  return (
    <div>
      <div className="D(f) Ai(s) Jc(s) Mih($100vh)">
        <div className="Mend($lg) Miw($60xl)">
          <PersonalDetails
            personal={personal}
            onEdit={() => setOpen('personal')}
          />
          <Contact data={{ phone, email }} onEdit={() => setOpen('contact')} />
          <AboutMe about={about} onEdit={() => setOpen('about')} />
          <Skills skills={skills} onEdit={() => setOpen('skills')} />
          <Experience
            experience={experience}
            onEdit={index => {
              console.log('EDITING');
              setIndex(index);
              setOpen('experience');
            }}
            onAdd={() => {
              console.log('ADDING');
              setIndex();
              setOpen('experience');
            }}
          />
        </div>
        <Portfolio
          portfolio={portfolio}
          onEdit={index => {
            console.log('EDITING');
            setIndex(index);
            setOpen('portfolio');
          }}
          onAdd={() => {
            console.log('ADDING');
            setIndex();
            setOpen('portfolio');
          }}
        />
      </div>
      <Modal
        isOpen={!isEmpty(open)}
        contentLabel="onRequestClose Example"
        onRequestClose={onCancel}
        className={`W($61xl) M(a) H($fc) Pos(r) ${
          ['skills', 'experience'].includes(open) ? 'T($deci)' : 'T($quarter)'
        } Bd(n) O(n)`}
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <EditFormModal
          onCancel={onCancel}
          data={profile[open]}
          onSave={saveFunctionMap[open]}
          open={open}
          {...extraProps}
        />
      </Modal>
      {countEmptyLarge > 1 ? <GetStarted profile={profile} /> : null}
    </div>
  );
};

ProfileDetails.propTypes = {
  profile: PropTypes.object,
  sendCode: PropTypes.func,
  getFilteredSkills: PropTypes.func,
  saveFunctionMap: PropTypes.object,
};

export default ProfileDetails;
