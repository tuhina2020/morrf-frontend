/**
 *
 * LandingPage
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { scrollIt } from 'utils/helper';
import { showmore as ShowMore } from 'Assets/svg-comp';
import { ComingSoonGraphic } from 'Assets/images';
import Header from 'components/Header';
import makeSelectLandingPage from './selectors';
import { setEmail } from './actions';
import reducer from './reducer';
import saga from './saga';
import EmailContainer from './emailContainer';

export function LandingPage({ onSubmitForm }) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });

  const emailPropsTop = {
    placeholder: 'Email address',
    containerClass: 'Mend(2vw) W(50%)',
    inputClass:
      'Bd(n) Bdb($bdnewGrey) Bd(n):a Bdb($bdnewGrey):a Bgc(white):a W(100%) Pt(8%) Pb(2%) Bgc(white) Ff($ffmont) Fz(0.8vw) Ff($ffmont)::ph Fz(0.8vw)::ph C($primaryDarkGrey)::ph',
    submitClass:
      'Bdrs(1.5vw) W(8vw) H(3vw) Bd($bdnewGrey) Ff($ffmont) Fz(1.2vw) ',
    onSubmitForm,
  };

  const emailPropsBottom = {
    placeholder: 'Email address',
    containerClass: 'Mend(2vw) W(25%)',
    inputClass:
      'Bd(n) Bdb($bdnewGrey) Bd(n):a O(n):a O(n):f Bdb($bdnewGrey):a Bgc(#ededed):a C($primary):a W(100%) Pt(8%) Pb(2%) Bgc(#ededed) Ff($ffmont) Fz(0.8vw) Ff($ffmont)::ph Fz(0.8vw)::ph C($primaryDarkGrey)::ph',
    submitClass:
      'Bdrs(1.5vw) W(8vw) H(3vw) Bd($bdnewGrey) Ff($ffmont) Fz(1.2vw)',
    formClass: 'D(f) Ai(b) Py(2vw)',
    onSubmitForm,
  };
  const secondPage = useRef(null);
  return (
    <div className="Ff($ffmont)">
      <Header />
      <div className="Mx(8vw) My(4vw)">
        <div>
          <div className="Bdb($bdGrey) D(f) Ai(c) Jc(sb)">
            <div className="W(38%)">
              <div className="C($primary) Fw($fwbold) Fz($fzlarge)">
                Ok, you got us
              </div>
              <div className="Fz($fzbody) C(#504d4d) My(3vw)">
                We are working on this very hard but we are really glad, you
                dropped-in. Please leave your email and we will make sure, we
                will update you as soon as we launch.
              </div>
              <div className="Mt(2vw) Mb(3vw)">
                <EmailContainer {...emailPropsTop} />
              </div>
            </div>
            <img src={ComingSoonGraphic} className="W(35%)" alt="Coming Soon" />
          </div>
          <div className="Ta(c)">
            <div className="Fz($fzsubheading) Fw($fwsemibold) Mt(3vw) Mb(1vw)">
              Here’s what we are building
            </div>
            <div className="Fz($fzbody) C(#504d4d) W(40%) M(a)">
              An efficient and effortless Design Services Freelance platform for
              both Designers and Businesses
            </div>
          </div>
          <div className="Ta(c) M(3vw) D(f) Jc(c) Ai(c)">
            <div className="Bdrs(2.5vw) W(5vw) H(5vw) Bxsh($bxshlightInset):h Bgc(#ededed):h Trsdu(0.5s) Trsp(a) Trstf(e)">
              <ShowMore
                width="5vw"
                height="5vw"
                className="Trsdu(0.5s) Trsp(a) Trstf(e)"
                onClick={e => {
                  const node = e.target.parentNode;
                  node.classList.toggle('Rotate(180deg)');
                  scrollIt(secondPage.current);
                }}
              />
            </div>
          </div>
        </div>
        <div className="D(f) Jc(sa) Ai(c)" ref={secondPage}>
          <div className="W(32%)">
            <div className="Fz($fzsubheading) Fw($fwsemibold) Pb(0.5vw)">
              For Designers
            </div>
            <div className="Bd($bddarkGrey) Bdrs($bdrstextbox) Fz($fztext) Fw($fwregular)">
              <div className="Mx(0.7vw) My(1.5vw)">
                <div className="M(0.5vw)">Project Connections</div>
                <div className="M(0.5vw)">Intuitive Project Planning</div>
                <div className="M(0.5vw)">Payment Protection</div>
              </div>
            </div>
          </div>
          <div className="W(32%)">
            <div className="Fz($fzsubheading) Fw($fwsemibold) Pb(0.5vw)">
              For Businesses
            </div>
            <div className="Bd($bddarkGrey) Bdrs($bdrstextbox) Fz($fztext) Fw($fwregular)">
              <div className="Mx(0.7vw) My(1.5vw)">
                <div className="M(0.5vw)">Find the right Designer</div>
                <div className="M(0.5vw)">Dedicated Consultant</div>
                <div className="M(0.5vw)">Complete Project Management</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Bgc(#ededed) Pt(2vw) Pb(1vw) Px(12vw)">
        <div className="Fz($fzsubheading) Fw($fwmedium)">
          Get the update from us when we launch
        </div>
        <EmailContainer {...emailPropsBottom} />
        <div className="Fz($fzcaption)">&copy; 2020 Morff</div>
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
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LandingPage);
