import { createReducer, on } from '@ngrx/store';
import {
  clearAlertInfoAction,
  setAlertInfoAction,
  setMessage,
  setLoadingSpinnerAction,
  setNgxSpinnerAction,
} from './shared.actions';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setNgxSpinnerAction, (state, action) => {
    return {
      ...state,
      loading: action.loading,
    };
  }),
  on(setAlertInfoAction, (state, action) => {
    return {
      ...state,
      alertInfo: action.alertInfo,
    };
  }),
  on(clearAlertInfoAction, (state, action) => {
    return {
      ...state,
      alertInfo: null,
    };
  }),
  on(setMessage, (state, action) => {
    return {
      ...state,
      message: action.message,
    };
  })
);

export function sharedReducer(state, action) {
  return _sharedReducer(state, action);
}
function setNgxSpinnerStartAction(
  setNgxSpinnerStartAction: any,
  arg1: (
    state: import('./shared.state').SharedState,
    action: any
  ) => {
    loading: any;
    alertInfo: import('../../core/models/alert.model').AlertInfo;
  }
): import('@ngrx/store').On<{ alertInfo: any; loading: any }> {
  throw new Error('Function not implemented.');
}
