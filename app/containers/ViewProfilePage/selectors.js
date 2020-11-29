import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 *  Direct selector to the profilePage state domain
 */
const selectViewProfilePageDomain = state =>
  state.viewProfilePage || initialState;

/**
 * Other specific selectors
 * */

const makeSelectViewProfilePage = () =>
  createSelector(
    selectViewProfilePageDomain,
    substate => substate,
  );

export default makeSelectViewProfilePage;

export { selectViewProfilePageDomain, makeSelectViewProfilePage };
