import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 *  Direct selector to the kycPage state domain
 */
const selectTabsPageDomain = state => state.tabsPage || initialState;

/**
 * Other specific selectors
 * */

const makeSelectTabsPage = () =>
  createSelector(
    selectTabsPageDomain,
    substate => substate,
  );

export default makeSelectTabsPage;

export { selectTabsPageDomain, makeSelectTabsPage };