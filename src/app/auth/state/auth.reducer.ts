import { createReducer, on } from '@ngrx/store';
import {
  userSessionHasSucceeded,
  loginSuccess,
  signoutRequest,
  signupSuccess,
  userReAuthenticationSuccess,
} from './auth.actions';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signoutRequest, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(userSessionHasSucceeded, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(userReAuthenticationSuccess, (state, action) => {
    return {
      ...state,
      reAuthenticated: action.reAuthenticated,
    };
  })
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
