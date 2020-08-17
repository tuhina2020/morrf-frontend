import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the landingPage state domain
 */

const selectLitePageDomain = state => state.litePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LitePage
 */

const makeSelectLitePage = () =>
  createSelector(
    selectLitePageDomain,
    substate => substate,
  );

export default makeSelectLitePage;
export { selectLitePageDomain, makeSelectLitePage };
