import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loginRequest = createAction(
  '[Login Page] Login Request',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ user: User }>()
);

export const signupRequest = createAction(
  '[Sign up Page] Signup Request',
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  '[Sign up Page] Signup Success',
  props<{ user: User }>()
);

export const signoutRequest = createAction('[Sign out] Sign out Request');

export const userSessionHasRequested = createAction(
  '[User Session] User Session Has Requested'
);
export const userSessionHasSucceeded = createAction(
  '[User Session] User Session Has Succeeded',
  props<{ user: User }>()
);

export const passwordResetRequested = createAction(
  '[Password Reset] Password Reset Requested',
  props<{ email: string }>()
);

export const passwordResetSucceeded = createAction(
  '[Password Reset Page] Password Reset Succeeded'
);

export const userReAuthenticationRequest = createAction(
  '[User Re-authentication] User Re-authentication Request',
  props<{ email: string; password: string }>()
);

export const userReAuthenticationSuccess = createAction(
  '[User Re-authentication] User Re-authentication Success',
  props<{ reAuthenticated: boolean }>()
);

export const changePasswordRequest = createAction(
  '[Change Password] Change password request',
  props<{ password: string }>()
);

export const changePasswordSuccess = createAction(
  '[Change Password] Change password success'
);
