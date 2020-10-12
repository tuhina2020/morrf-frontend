import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import MobilePage from 'components/organisms/LitePage/mobile';
import DesktopPage from 'components/organisms/LitePage/desktop';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setToast } from 'utils/helper';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import { emailRequest, callbackRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import { setToastData, getAllSkills } from './actions';
import { makeSelectLitePage } from './selectors';
const LitePage = ({
  responsiveData,
  sendEmail,
  callbackReq,
  dispatchToastData,
  getSkills,
  litePage,
}) => {
  useInjectReducer({ key: 'litePage', reducer });
  useInjectSaga({ key: 'litePage', saga, mode: RESTART_ON_REMOUNT });
  const { isDesktopOrLaptop } = responsiveData;
  const { error, success, skillsList } = litePage;
  if (error.message) {
    setToast(error);
    dispatchToastData({});
  }

  useEffect(() => {
    getSkills();
  }, []);

  console.log('RESPONSIVE ', responsiveData);

  const props = {
    isDesktopOrLaptop,
    callbackReq,
    success,
    sendEmail,
    allProfessionTypes: skillsList,
  };
  return (
    <div>
      {isDesktopOrLaptop ? (
        <DesktopPage {...props} />
      ) : (
        <MobilePage {...props} />
      )}
    </div>
  );
};

LitePage.propTypes = {
  responsiveData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  litePage: makeSelectLitePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendEmail: params => dispatch(emailRequest(params)),
    callbackReq: params => dispatch(callbackRequest(params)),
    dispatchToastData: params => dispatch(setToastData(params)),
    getSkills: () => dispatch(getAllSkills()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LitePage);
