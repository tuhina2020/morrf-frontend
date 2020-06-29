/**
 *
 * LandingPage
 *
 */

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import { useInjectReducer } from 'utils/injectReducer';
import { scrollTo, getTransitionClass, scrollToElement } from 'utils/helper';
import { showmore as ShowMore, curve as Curve } from 'Assets/svg-comp';
import { ComingSoonGraphic } from 'Assets/images';
import Header from 'components/Header';
import Footer from 'components/Footer';
import EmailContainer from 'components/EmailContainer';

import MovingDots from 'components/MovingDots';
import { FLEX_CENTER_CENTER } from 'utils/css';
import makeSelectLandingPage from './selectors';
import { setEmail, sendEmail, setName } from './actions';
import reducer from './reducer';
import saga from './saga';
import ValueInformation from './valueInformation';

export function LandingPage({ onSubmitForm, responsiveData }) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga, mode: RESTART_ON_REMOUNT });
  const secondPage = useRef(null);

  const [showCurve, setCurveStatus] = useState(false);
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
  window.addEventListener('scroll', onScroll);

  useEffect(() => {
    setTimeout(() => {
      setCurveStatus(true);
    }, 500);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  const { isDesktopOrLaptop } = responsiveData;
  const emailPropsTop = {
    formClass: isDesktopOrLaptop ? 'D(f) Ai(c) Jc(sb)' : 'D(f) Fld(c)',
    containerClass: isDesktopOrLaptop ? 'D(f) Jc(sb) W(100%)' : '',
    submitSuccessStyle: isDesktopOrLaptop
      ? 'Fz($fzcaption)'
      : 'Fz($fzlarge) Fld(c) Mt(17vw) Mb(22vw)',
    onSubmitForm,
  };

  const onClickShowMore = () => {
    setScrollStatus(!scrolled);
    const showMore = () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top === 0)
        scrollToElement({
          element: secondPage.current,
          offset: 100,
          duration: 400,
        });
      else scrollTo({});
    };
    setTimeout(showMore, 200);
  };

  return (
    <div className="Ff($ffmont) Ovx(h)">
      <Header shadow={headerShadow} isDesktopOrLaptop={isDesktopOrLaptop} />
      <div
        className={`Pos(a) Z(-1) ${getTransitionClass(2)} ${
          showCurve ? (isDesktopOrLaptop ? 'T(4vw)' : 'T(20vw)') : 'T(-24vw)'
        }`}
      >
        <Curve width="100vw" />
      </div>
      <div
        className={
          isDesktopOrLaptop
            ? 'Mx(8vw) Mt(8vw) Mb(4vw)'
            : 'Mx(5.5vw) Mt(11vw) Mb(4vw)'
        }
      >
        <div className={isDesktopOrLaptop ? 'Bdb($bdGrey)' : ''}>
          <div
            className={
              isDesktopOrLaptop
                ? 'D(f) Ai(e) Jc(sb) Mstart(8.7vw) Mb(3vw) Fld(rr)'
                : ''
            }
          >
            <div
              className={`${
                isDesktopOrLaptop ? 'W(30vw)' : 'W(62vw) Mb(3vw) Mt(20vw)'
              } ${getTransitionClass(isDesktopOrLaptop ? 2 : 3)} Pos(r) ${
                showCurve
                  ? isDesktopOrLaptop
                    ? 'End(3vw)'
                    : 'End(-19vw)'
                  : isDesktopOrLaptop
                  ? 'End(-20vw)'
                  : 'End(-100vw)'
              }`}
            >
              <img
                src={ComingSoonGraphic}
                className="W(100%)"
                alt="Coming Soon"
              />
            </div>
            <div className={isDesktopOrLaptop ? 'W(34vw) Mt(5vw)' : ''}>
              <div
                className={`C($headingDarkGrey) Fw($fwbold) ${
                  isDesktopOrLaptop ? 'Fz($fzlarge)' : 'Fz($fzmobilelarge)'
                }`}
              >
                Hey there!
              </div>
              <div
                className={`${
                  isDesktopOrLaptop
                    ? 'Fz($fzsubheading) Lh($lhsubheading)'
                    : 'Fz($fzlarge) Lh($lhmobilesubheading)'
                } C($subheadingDarkGrey) My(1.5vw) Ff($ffopensans)`}
              >
                We are working on this very hard but we are really glad, you
                dropped-in. Please leave your email and we will make sure, we
                will update you as soon as we launch.
              </div>
              <EmailContainer
                {...emailPropsTop}
                isDesktopOrLaptop={isDesktopOrLaptop}
              />
              {isDesktopOrLaptop ? null : (
                <div className="Mt(2vw) D(f) Ai(c) Jc(c) Fld(c)">
                  <div
                    className={`Bdrs(2.5vw) W(12vw) H(12vw) Mx(47.5%) Bxsh($bxshlightInset):h ${getTransitionClass(
                      0.4,
                    )} ${scrolled ? 'Op(0)' : ''}`}
                  >
                    <ShowMore width="12vw" onClick={onClickShowMore} />
                  </div>
                  <div
                    className={`${getTransitionClass(2)} Trsde(0.5s) ${
                      scrolled ? 'Pos(r) B(3vw)' : 'Op(0)'
                    }`}
                  >
                    <MovingDots isDesktop={isDesktopOrLaptop} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="Ta(c)" ref={!isDesktopOrLaptop ? secondPage : null}>
          <div
            className={`${
              isDesktopOrLaptop
                ? 'Fz($fzsubheading) Mt(3vw) Mb(1vw)'
                : 'Fz($fzmobileheading) Mt(12vw) Mb(3vw)'
            } Fw($fwmedium) Ff($ffmont) C($subheadingDarkGrey)`}
          >
            Here’s what we are building
          </div>
          <div
            className={`${
              isDesktopOrLaptop
                ? 'Fz($fzsubheading) Lh($lhsubheading) W(40%)'
                : 'Fz($fzlarge) Lh($lhmobilesubheading)'
            } M(a) Ff($ffopensans) C($bodyGrey)`}
          >
            An efficient and effortless Design Services Freelance platform for
            both Designers and Businesses
          </div>
        </div>
        {isDesktopOrLaptop ? (
          <div className="Mt(2vw) D(f) Ai(c) Jc(c) Fld(c)">
            <div
              className={`Bdrs(2.5vw) W(5vw) H(5vw) Mx(47.5%) Bxsh($bxshlightInset):h ${getTransitionClass(
                0.4,
              )} ${scrolled ? 'Op(0)' : ''}`}
            >
              <ShowMore width="5vw" height="5vw" onClick={onClickShowMore} />
            </div>
            <div
              className={`${getTransitionClass(2)} Trsde(0.5s) ${
                scrolled ? 'Pos(r) B(3vw)' : 'Op(0)'
              }`}
            >
              <MovingDots />
            </div>
          </div>
        ) : null}
      </div>

      <div
        className={`${getTransitionClass(2)} ${
          scrolled
            ? 'Op(1)'
            : isDesktopOrLaptop
            ? 'Op(0) TranslateY(4vw)'
            : 'Op(0) TranslateY(6vw)'
        } ${
          isDesktopOrLaptop
            ? 'Bdrstend(3vw) Bdrststart(3vw)'
            : 'Bdrstend(10vw) Bdrststart(10vw) Pb(1vw)'
        } Bgc($navBarBg)`}
        ref={isDesktopOrLaptop ? secondPage : null}
      >
        <ValueInformation
          isDesktopOrLaptop={isDesktopOrLaptop}
          scrolled={scrolled}
        />
      </div>

      <Footer
        onSubmitForm={onSubmitForm}
        isDesktopOrLaptop={isDesktopOrLaptop}
      />
    </div>
  );
}

LandingPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  responsiveData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  landingPage: makeSelectLandingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSubmitForm: ({ email, name }) => {
      dispatch(setEmail(email));
      dispatch(setName(name));
      dispatch(sendEmail());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LandingPage);
