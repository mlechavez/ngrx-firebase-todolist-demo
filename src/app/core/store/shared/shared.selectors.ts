import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

const SHARED_STATE_NAME = 'shared';

const selectSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const selectIsLoading = createSelector(
  selectSharedState,
  (state) => state.loading
);
export const selectAlertInfo = createSelector(
  selectSharedState,
  (state) => state.alertInfo
);
export const selectTobeDeletedTask = createSelector(
  selectSharedState,
  (state) => state.tobeDeletedTask
);
