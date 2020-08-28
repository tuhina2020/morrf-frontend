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
      category: 'category-3',
      id: '332',
      name: 'packaging',
      groupLabel: 'Graphic design',
    },
    {
      category: 'category-1',
      id: '115',
      name: 'Museum designer',
      groupLabel: 'Space design / Architecture',
    },
    {
      category: 'category-1',
      id: '118',
      name: 'Recce engineer',
      groupLabel: 'Space design / Architecture',
    },
    {
      category: 'category-2',
      id: '222',
      name: 'Furniture',
      groupLabel: 'Product design',
    },
    {
      category: 'category-1',
      id: '116',
      name: 'Landscape designer',
      groupLabel: 'Space design / Architecture',
    },
    {
      category: 'category-4',
      id: '442',
      name: 'researcher',
      groupLabel: 'Strategy design',
    },
    {
      category: 'category-1',
      id: '117',
      name: 'Lighting designer',
      groupLabel: 'Space design / Architecture',
    },
    {
      category: 'category-1',
      id: '114',
      name: 'Exhibition designer',
      groupLabel: 'Space design / Architecture',
    },
    {
      category: 'category-3',
      id: '331',
      name: 'Logo',
      groupLabel: 'Graphic design',
    },
    {
      category: 'category-3',
      id: '334',
      name: 'website',
      groupLabel: 'Graphic design',
    },
    {
      category: 'category-1',
      id: '113',
      name: 'Retail designer',
      groupLabel: 'Space design / Architecture',
    },
    {
      category: 'category-4',
      id: '441',
      name: 'presentation',
      groupLabel: 'Strategy design',
    },
    {
      category: 'category-2',
      id: '224',
      name: 'Ceramic',
      groupLabel: 'Product design',
    },
    {
      category: 'category-3',
      id: '337',
      name: 'spatial graphics',
      groupLabel: 'Graphic design',
    },
    {
      category: 'category-3',
      id: '336',
      name: 'book',
      groupLabel: 'Graphic design',
    },
    {
      category: 'category-4',
      id: '443',
      name: 'infographic',
      groupLabel: 'Strategy design',
    },
    {
      category: 'category-2',
      id: '223',
      name: 'Toy',
      groupLabel: 'Product design',
    },
    {
      category: 'category-4',
      id: '444',
      name: 'Marketing',
      groupLabel: 'Strategy design',
    },
    {
      category: 'category-2',
      id: '221',
      name: 'Industrial',
      groupLabel: 'Product design',
    },
    {
      category: 'category-1',
      id: '111',
      name: 'Architect',
      groupLabel: 'Space design / Architecture',
    },
    {
      category: 'category-1',
      id: '112',
      name: 'Residential interior designer',
      groupLabel: 'Space design / Architecture',
    },
    {
      category: 'category-3',
      id: '333',
      name: 'branding',
      groupLabel: 'Graphic design',
    },
    {
      category: 'category-2',
      id: '226',
      name: 'Textile',
      groupLabel: 'Product design',
    },
    {
      category: 'category-2',
      id: '225',
      name: 'Digital product',
      groupLabel: 'Product design',
    },
    {
      category: 'category-3',
      id: '335',
      name: 'brochure',
      groupLabel: 'Graphic design',
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
