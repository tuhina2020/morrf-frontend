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
import pick from 'lodash/pick';
import Header from 'components/molecules/Header';
import LoadingAnimation from 'Assets/gifs/loading.gif';
import { get } from 'lodash';
import EditFormModal from './editModal';
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
  portfolioImages,
  logout,
  loading,
  viewOnly,
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

  const [blur, setBlur] = useState(loading);

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
    setBlur(false);
  };

  const onCancelForm = () => {
    const getstarted = () => {
      setTimeout(() => {
        setOpen('getstarted');
        setSourcePage('getstarted');
        setBlur(true);
      }, 400);
    };
    const main = () => {
      setTimeout(() => {
        setOpen('');
        setBlur(false);
        setSourcePage('main');
      }, 400);
    };
    return source === 'getstarted' ? getstarted() : main();
  };

  const extraProps = {
    allSkills: skillsList,
    onSendCode: sendCode,
    source,
    currentIndex,
    onClickAdd: setOpen,
    closeDialog: () => {
      setOpen('');
      setBlur(false);
    },
    verifyPhone,
    uploadImageData,
    removePortfolio,
    removeExperience,
    removePortfolioImage,
    portfolioImages: get(portfolioImages, 'images', []),
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

  useEffect(() => {
    if (isEmpty(open)) setBlur(loading);
  }, [loading]);

  const Loading = () =>
    loading ? (
      <div className="W($full) H(100vw) Op(0.5) Bgc(white) Z(2)">
        <img
          src={LoadingAnimation}
          className="W($third) Mx(35%) Pos(r) T($20x)"
        />
      </div>
    ) : null;

  return (
    <div>
      <Header
        isDesktopOrLaptop
        logout={isEmpty(open) && !viewOnly}
        logoutAction={logout}
        blur={blur}
      />
      <Loading />
      <div className={`Z(1) ${blur ? 'Blur($xxs)' : undefined}`}>
        <div className={`D(f) Fxd(r) Flw(w) Mx($10x) Maw($full) Ai(s) Jc(s) P($lg)`}>
          <div className="D(f) Fxd(c) Flb(f) F(o) Mend($lg) Miw($60xl)">
            <PersonalDetails
              personal={personal}
              onEdit={() => {
                setBlur(true);
                setOpen('personal');
                setSourcePage('main');
              }}
              viewOnly={!!viewOnly}
            />
            {!viewOnly && (
              <Contact
                data={{ phone, email, personal }}
                onEdit={() => {
                  setBlur(true);
                  setSourcePage('main');
                  setOpen('contact');
                }}
              />
            )}
            <AboutMe
              about={about}
              onEdit={() => {
                setBlur(true);
                setSourcePage('main');
                setOpen('about');
              }}
              viewOnly={!!viewOnly}
            />
            <Skills
              skills={skills}
              onEdit={() => {
                setBlur(true);
                setSourcePage('main');
                setOpen('skills');
              }}
              viewOnly={!!viewOnly}
            />
            <Experience
              onEdit={index => {
                console.log('EDITING');
                setIndex(index);
                setBlur(true);
                setSourcePage('main');
                setOpen('editExperience');
              }}
              data={experience}
              onAdd={() => {
                console.log('ADDING');
                setIndex();
                setBlur(true);
                setSourcePage('main');
                setOpen('experience');
              }}
              viewOnly={!!viewOnly}
            />
          </div>
          <Portfolio
            portfolio={portfolio}
            onEdit={index => {
              console.log('EDITING');
              setIndex(index);
              setBlur(true);
              setSourcePage('main');
              setPortfolioImages({
                images: portfolio[index].files.map(file => ({
                  url: file.url,
                  id: file.id,
                })),
                id: portfolio[index].id,
                done: false,
              });
              setOpen('editPortfolio');
            }}
            onPreviewImage={setBlur}
            onAdd={() => {
              console.log('ADDING');
              setIndex();
              setBlur(true);
              setSourcePage('main');
              setOpen('portfolio');
            }}
            viewOnly={!!viewOnly}
          />
        </div>
        {!viewOnly && (
          <GetStartedMajor
            data={profile}
            onStart={() => {
              setSourcePage('getstarted');
              setOpen('getstarted');
              setBlur(true);
            }}
            loading={blur}
            countEmptyLarge={countEmptyLarge}
            countEmptySmall={countEmptySmall}
          />
        )}
      </div>

      {!viewOnly && (
        <Modal
          isOpen={!isEmpty(open)}
          contentLabel="onRequestClose Example"
          onRequestClose={onCancelModal}
          className="W($60xl) M(a) H($fc) Pos(r) T($third)  Bd(n) O(n)"
          overlayClassName="Bgc($modal) Pos(a) T(0) Start(0) B(0) End(0) W($full) H($full) Ov(h)"
        >
          <EditFormModal
            onCancel={onCancelForm}
            data={open === 'getstarted' ? profile : profile[open]}
            onSave={params => {
              saveFunctionMap[open](params);
              setBlur(true);
            }}
            open={open}
            {...extraProps}
          />
        </Modal>
      )}
    </div>
  );
};

ProfileDetails.propTypes = {
  profile: PropTypes.object,
  sendCode: PropTypes.func,
  saveFunctionMap: PropTypes.object,
  viewOnly: PropTypes.bool,
};

ProfileDetails.defaultProps = {
  viewOnly: false,
};

export default ProfileDetails;
