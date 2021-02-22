import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profilePage state domain
 */

const selectProjectPageDomain = state => state.projectPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfilePage
 */

const makeSelectProjectPage = () =>
  createSelector(
    selectProjectPageDomain,
    substate => substate,
  );

export default makeSelectProjectPage;
export { selectProjectPageDomain, makeSelectProjectPage };
