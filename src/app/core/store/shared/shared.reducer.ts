import { createReducer, on } from '@ngrx/store';
import {
  clearAlertInfoAction,
  setAlertInfoAction,
  setMessage,
  setNgxSpinnerAction,
  setTobeDeletedTaskRequest,
  unsetTobeDeletedTask,
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
  }),
  on(setTobeDeletedTaskRequest, (state, action) => {
    return {
      ...state,
      tobeDeletedTask: action.tobeDeletedTask,
    };
  }),
  on(unsetTobeDeletedTask, (state) => {
    return {
      ...state,
      tobeDeletedTask: null,
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
    alertInfo: import('../../models/alert.model').AlertInfo;
  }
): import('@ngrx/store').On<{ alertInfo: any; loading: any }> {
  throw new Error('Function not implemented.');
}
