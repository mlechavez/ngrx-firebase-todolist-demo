import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getIsLoading = createSelector(
  getSharedState,
  (state) => state.loading
);

export const getAlertInfo = createSelector(
  getSharedState,
  (state) => state.alertInfo
);
