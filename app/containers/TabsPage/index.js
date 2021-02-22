import React, { useEffect } from 'react';

import TabsDetails from 'templates/TabsDetails/desktop';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { Redirect } from 'react-router-dom';

import { compose } from 'redux';

import { makeSelectTabsPage } from './selectors';

import { useInjectSaga } from 'utils/injectSaga';

import { RESTART_ON_REMOUNT } from 'utils/constants';

import { setToast, isLoggedIn } from 'utils/helper';

import { useInjectReducer } from 'utils/injectReducer';

import { logout } from 'containers/ProfilePage/actions';
import { isEmpty } from 'lodash';
import { queryByDisplayValue } from 'react-testing-library';
import reducer from './reducer';

const TabsPage = ({ loggedIn, logoutAction }) => {
  if (!isLoggedIn()) return <Redirect to="/login" />;
  useInjectReducer({ key: 'tabsPage', reducer });

  return <TabsDetails logout={logoutAction} />;
};
TabsPage.propTypes = { responsiveData: PropTypes.object };

const mapStateToProps = createStructuredSelector({
  tabsPage: makeSelectTabsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: () => dispatch(logout()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TabsPage);
