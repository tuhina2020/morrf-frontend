import React, { useState } from 'react';
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
import { setToastData } from './actions';
import { makeSelectLitePage } from './selectors';

const LitePage = ({
  responsiveData,
  sendEmail,
  callbackReq,
  dispatchToastData,
  litePage,
}) => {
  useInjectReducer({ key: 'litePage', reducer });
  useInjectSaga({ key: 'litePage', saga, mode: RESTART_ON_REMOUNT });
  const { isDesktopOrLaptop } = responsiveData;
  const { error, success } = litePage;
  if (error.message) {
    setToast(error);
    dispatchToastData({});
  }

  const allProfessionTypes = [
    {
      id: '1234',
      name: 'furnace design',
      category: 'newcategory-1',
      groupLabel: 'Architecture',
    },
    {
      id: '2451',
      name: 'Illustration Tools',
      category: 'newcategory-1',
      groupLabel: 'Architecture',
    },
    {
      id: '123-a',
      name: 'furniture design',
      category: 'newcategory-1',
      groupLabel: 'Architecture',
    },
    {
      id: '245',
      name: 'UI/UX',
      category: 'newcategory-1',
      groupLabel: 'Architecture',
    },
    {
      id: '546-es',
      name: 'Architecture',
      category: 'newcategory-1',
      groupLabel: 'Architecture',
    },
    {
      id: '2452',
      name: 'UI/UX Research',
      category: 'newcategory-2',
      groupLabel: 'Design Skills',
    },
    {
      id: '2452-xd',
      name: 'Geo mapping',
      category: 'newcategory-2',
      groupLabel: 'Design Skills',
    },
    {
      id: '2452-ab',
      name: 'Metallurgy',
      category: 'newcategory-2',
      groupLabel: 'Design Skills',
    },
    {
      id: '5469-b',
      name: 'Town planning',
      category: 'newcategory-2',
      groupLabel: 'Design Skills',
    },
    {
      id: '123-b',
      name: 'interior design',
      category: 'newcategory-2',
      groupLabel: 'Design Skills',
    },
    {
      id: '245-bx',
      name: 'Illustrator',
      category: 'newcategory-3',
      groupLabel: 'Software Skills',
    },
    {
      id: '546',
      name: 'Photoshop',
      category: 'newcategory-3',
      groupLabel: 'Software Skills',
    },
    {
      id: '5469-a',
      name: '3ds Max',
      category: 'newcategory-3',
      groupLabel: 'Software Skills',
    },
  ];

  const props = {
    allProfessionTypes,
    isDesktopOrLaptop,
    sendEmail,
    callbackReq,
    success,
  };

  return isDesktopOrLaptop ? (
    <DesktopPage {...props} />
  ) : (
    <MobilePage {...props} />
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LitePage);
