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
import { scrollIt, scrollTo } from 'utils/helper';
import { showmore as ShowMore, curve as Curve } from 'Assets/svg-comp';
import { ComingSoonGraphic } from 'Assets/images';
import Header from 'components/Header';
import Footer from 'components/Footer';
import EmailContainer from 'components/EmailContainer';
import makeSelectLandingPage from './selectors';
import { setEmail, sendEmail, setName } from './actions';
import reducer from './reducer';
import saga from './saga';
import ValueInformation from './valueInformation';

export function LandingPage({ onSubmitForm }) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga, mode: RESTART_ON_REMOUNT });
  const secondPage = useRef(null);

  const emailPropsTop = {
    formClass: 'D(f) Ai(e) Jc(sb)',
    containerClass: 'D(f) Jc(sb) W(100%)',
    onSubmitForm,
  };

  const [showCurve, setCurveStatus] = useState(false);
  const [scrolled, setScrollStatus] = useState(false);

  const onScroll = () => {
    if (
      document.documentElement.scrollTop > 100 ||
      (document.body.scrollTop > 100 && !scrolled)
    ) {
      setScrollStatus(true);
    } else {
      setScrollStatus(false);
    }
  };
  window.addEventListener('scroll', onScroll);

  useEffect(() => {
    setTimeout(() => {
      setCurveStatus(true);
    }, 200);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="Ff($ffmont) Ovx(h)">
      <Header />
      <div
        className={`Pos(a) Z(-1) Trsdu(2s) Trsp(a) Trstf(e) ${
          showCurve ? 'T(4vw)' : 'T(-24vw)'
        }`}
      >
        <Curve width="100vw" />
      </div>
      <div className="Mx(8vw) Mt(8vw) Mb(4vw)">
        <div className="Bdb($bdGrey)">
          <div className="D(f) Ai(c) Jc(sb) Mstart(8.7vw) Mb(3vw)">
            <div className="W(40%)">
              <div className="C(black) Fw($fwbold) Fz($fzlarge)">
                Hey there!
              </div>
              <div className="Fz($fzsubheading) C(#504d4d) My(1.5vw) Ff($ffopensans) Lh($lhsubheading)">
                We are working on this very hard but we are really glad, you
                dropped-in. Please leave your email and we will make sure, we
                will update you as soon as we launch.
              </div>
              <div className="Mt(2vw)">
                <EmailContainer {...emailPropsTop} />
              </div>
            </div>
            <div
              className={`W(30%) Trsdu(1s) Trsp(a) Trstf(e) Pos(r) ${
                showCurve ? 'End(10vw)' : 'End(-32vw)'
              }`}
            >
              <img
                src={ComingSoonGraphic}
                className="W(100%)"
                alt="Coming Soon"
              />
            </div>
          </div>
        </div>
        <div className="Ta(c)">
          <div className="Fz($fzsubheading) Fw($fwsemibold) Mt(3vw) Mb(1vw)">
            Here’s what we are building
          </div>
          <div className="Fz($fzbody) C(#504d4d) W(40%) M(a) Ff($ffopensans)">
            An efficient and effortless Design Services Freelance platform for
            both Designers and Businesses
          </div>
        </div>
        <div className="Ta(c) D(f) Jc(c) Ai(c) Mt(2vw)">
          <div
            className={`Bdrs(2.5vw) W(5vw) H(5vw) Bxsh($bxshlightInset):h Bgc(#ededed):h Trsdu(0.8s) Trsp(a) Trstf(e) ${
              scrolled ? 'Rotate(180deg)' : ''
            }`}
          >
            <ShowMore
              width="5vw"
              height="5vw"
              onClick={() => {
                setScrollStatus(!scrolled);
                setTimeout(() => {
                  const top =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                  if (top === 0) scrollIt(secondPage.current);
                  else scrollTo({});
                }, 600);
              }}
            />
          </div>
        </div>
      </div>
      <div
        ref={secondPage}
        className={`Trsdu(2s) Trsp(a) Trstf(e) ${
          scrolled ? 'Op(1) TranslateY(-4vw)' : 'Op(0)'
        }`}
      >
        <ValueInformation />
      </div>
      <Footer onSubmitForm={onSubmitForm} />
    </div>
  );
}

LandingPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
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
