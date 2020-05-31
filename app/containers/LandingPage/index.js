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
import { useInjectReducer } from 'utils/injectReducer';
import { scrollIt, scrollTo } from 'utils/helper';
import { showmore as ShowMore } from 'Assets/svg-comp';
import { ComingSoonGraphic } from 'Assets/images';
import Header from 'components/Header';
import Footer from 'components/Footer';
import makeSelectLandingPage from './selectors';
import { setEmail, sendEmail } from './actions';
import reducer from './reducer';
import saga from './saga';
import EmailContainer from 'components/EmailContainer';
import ValueInformation from './valueInformation';

export function LandingPage({ onSubmitForm }) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  const secondPage = useRef(null);

  const emailPropsTop = {
    placeholder: 'Email address',
    containerClass: 'Mend(2vw) W(50%)',
    inputClass:
      'Bd(n) Bdb($bdnewGrey) Bd(n):a Bgc(white):a W(100%) Pt(8%) Pb(2%) Bgc(white) Ff($ffmont) Fz(0.8vw) Ff($ffmont)::ph Fz(0.8vw)::ph C($primaryDarkGrey)::ph',
    submitClass:
      'Bdrs(0.2vw) W(5vw) H(2vw) Bd($bdnewGrey) Ff($ffmont) Fz(0.8vw) Bgc(#ededed)',
    inactiveButton: 'Bgc(white)',
    onSubmitForm,
  };

  return (
    <div className="Ff($ffmont)">
      <Header />
      <div className="Mx(8vw) My(4vw)">
        <div>
          <div className="Bdb($bdGrey) D(f) Ai(c) Jc(sb)">
            <div className="W(40%) Mb(3vw)">
              <div className="C(black) Fw($fwbold) Fz($fzlarge)">
                Hey there!
              </div>
              <div className="Fz($fzbody) C(#504d4d) My(1.8vw) Ff($ffopensans) Lh(2vw)">
                We are working on this very hard but we are really glad, you
                dropped-in. Please leave your email and we will make sure, we
                will update you as soon as we launch.
              </div>
              <div className="Mt(2vw)">
                <EmailContainer {...emailPropsTop} />
              </div>
            </div>
            <div className="W(33%)">
              <img
                src={ComingSoonGraphic}
                className="W(100%)"
                alt="Coming Soon"
              />
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
          <div className="Ta(c) D(f) Jc(c) Ai(c)">
            <div className="Bdrs(2.5vw) W(5vw) H(5vw) Bxsh($bxshlightInset):h Bgc(#ededed):h Trsdu(0.5s) Trsp(a) Trstf(e)">
              <ShowMore
                width="5vw"
                height="5vw"
                className="Trsdu(0.8s) Trsp(a) Trstf(e)"
                onClick={e => {
                  e.target.parentNode.classList.toggle('Rotate(180deg)');
                  secondPage.current.classList.toggle('TranslateY(6vw)');
                  const top =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                  top === 0 ? scrollIt(secondPage.current) : scrollTo({});
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        ref={secondPage}
        className="TranslateY(6vw) Trsdu(2s) Trsp(a) Trstf(e)"
      >
        <ValueInformation />
        <Footer onSubmitForm={onSubmitForm} />
      </div>
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
    onSubmitForm: ({ email }) => {
      dispatch(setEmail(email));
      dispatch(sendEmail());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LandingPage);
