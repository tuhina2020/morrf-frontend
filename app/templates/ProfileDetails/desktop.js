import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import PersonalDetails from 'components/organisms/ProfileDetails/personal';
import AboutMe from 'components/organisms/ProfileDetails/about';
import Contact from 'components/organisms/ProfileDetails/contact';
import Experience from 'components/organisms/ProfileDetails/experience';
import Portfolio from 'components/organisms/ProfileDetails/portfolio';
import Skills from 'components/organisms/ProfileDetails/skills';
import GetStartedMajor from 'components/organisms/EditCarousels/major';
import isEmpty from 'lodash/isEmpty';
import Modal from 'react-modal';
import EditFormModal from './editModal';
import pick from 'lodash/pick';
import Header from 'components/Header';
const ProfileDetails = ({
  profile,
  sendCode,
  saveFunctionMap,
  verifyPhone,
  uploadImageData,
  removePortfolio,
  removeExperience,
  removePortfolioImage,
  setPortfolioImages,
  logout,
}) => {
  const {
    personal,
    about,
    phone,
    email,
    experience,
    portfolio,
    skills,
    skillsList,
  } = profile;

  const countEmptyLarge = [portfolio, experience].filter(isEmpty).length;
  const countEmptySmall = [personal, about, phone, skills].filter(isEmpty)
    .length;
  const [open, setOpen] = useState('');
  const [currentIndex, setIndex] = useState();
  const [source, setSourcePage] = useState('main');
  Modal.setAppElement('#app');
  const onCancelModal = () => {
    setOpen('');
    setSourcePage('main');
  };

  const onCancelForm = useCallback(() => {
    const getstarted = () => {
      setOpen('getstarted');
      setSourcePage('getstarted');
    };
    const main = () => {
      setOpen('');
      setSourcePage('main');
    };
    return source === 'getstarted' ? getstarted() : main();
  }, [source]);

  const extraProps = {
    allSkills: skillsList,
    onSendCode: sendCode,
    source,
    currentIndex,
    onClickAdd: setOpen,
    closeDialog: () => setOpen(''),
    verifyPhone,
    uploadImageData,
    removePortfolio,
    removeExperience,
    removePortfolioImage,
  };

  const [scrolled, setScrollStatus] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const onScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      setHeaderShadow(true);
    } else {
      setHeaderShadow(false);
    }
    if (
      document.documentElement.scrollTop > 100 ||
      (document.body.scrollTop > 100 && !scrolled)
    ) {
      setScrollStatus(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <div>
      <Header
        shadow={headerShadow}
        isDesktopOrLaptop={true}
        height="72px"
        padding="Px(6%)"
        bgc="white"
        logout={true}
        logoutAction={logout}
      />
      <div className="D(f) Ai(s) Jc(s) P($lg) Pos(r) T($5xl)">
        <div className="Mend($lg) Miw($60xl)">
          <PersonalDetails
            personal={personal}
            onEdit={() => setOpen('personal')}
          />
          <Contact data={{ phone, email }} onEdit={() => setOpen('contact')} />
          <AboutMe about={about} onEdit={() => setOpen('about')} />
          <Skills skills={skills} onEdit={() => setOpen('skills')} />
          <Experience
            onEdit={index => {
              console.log('EDITING');
              setIndex(index);
              setOpen('editExperience');
            }}
            data={experience}
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
            setPortfolioImages({
              images: portfolio[index].files.map(file =>
                pick(file, ['id', 'name']),
              ),
              id: portfolio[index].id,
            });
            setOpen('editPortfolio');
          }}
          onAdd={() => {
            console.log('ADDING');
            setIndex();
            setOpen('portfolio');
          }}
        />
      </div>
      <GetStartedMajor
        data={profile}
        onStart={() => {
          setSourcePage('getstarted');
          setOpen('getstarted');
        }}
        countEmptyLarge={countEmptyLarge}
        countEmptySmall={countEmptySmall}
      />
      <Modal
        isOpen={!isEmpty(open)}
        contentLabel="onRequestClose Example"
        onRequestClose={onCancelModal}
        className={`W($60xl) M(a) H($fc) Pos(r) T($10x)  Bd(n) O(n)`}
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <EditFormModal
          onCancel={onCancelForm}
          data={open === 'getstarted' ? profile : profile[open]}
          onSave={saveFunctionMap[open]}
          open={open}
          {...extraProps}
        />
      </Modal>
    </div>
  );
};

ProfileDetails.propTypes = {
  profile: PropTypes.object,
  sendCode: PropTypes.func,
  saveFunctionMap: PropTypes.object,
};

export default ProfileDetails;
