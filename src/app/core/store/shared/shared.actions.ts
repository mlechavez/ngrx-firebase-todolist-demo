import { createAction, props } from '@ngrx/store';
import { AlertInfo } from 'src/app/core/models/alert.model';

export const setLoadingSpinnerAction = createAction(
  '[Loading Spinner] Set Loading Spinner',
  props<{ loading: boolean }>()
);

export const setAlertInfoAction = createAction(
  '[Alert Info] Set Alert Info',
  props<{ alertInfo: AlertInfo }>()
);

export const clearAlertInfoAction = createAction(
  '[Alert Info] Clear Alert Info'
);

export const setNgxSpinnerAction = createAction(
  '[Ngx Spinner] Ngx Spinner Start',
  props<{ loading: boolean }>()
);

export const setMessage = createAction(
  '[Message info] Error or info message',
  props<{ message: string }>()
);
