import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 *  Direct selector to the kycPage state domain
 */
const selectKYCPageDomain = state => state.kycPage || initialState;

/**
 * Other specific selectors
 * */

const makeSelectKYCPage = () =>
  createSelector(
    selectKYCPageDomain,
    substate => substate,
  );

export default makeSelectKYCPage;

export { selectKYCPageDomain, makeSelectKYCPage };