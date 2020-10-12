import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 *  Direct selector to the profilePage state domain
 */
const selectProfilePageDomain = state => state.profilePage || initialState;

/**
 * Other specific selectors
 * */

const makeSelectProfilePage = () =>
  createSelector(
    selectProfilePageDomain,
    substate => substate,
  );

export default makeSelectProfilePage;

export { selectProfilePageDomain, makeSelectProfilePage };
