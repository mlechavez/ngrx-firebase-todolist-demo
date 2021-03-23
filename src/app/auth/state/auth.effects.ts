import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromLoginAction from './auth.actions';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  setMessage,
  setAlertInfoAction,
} from 'src/app/shared/state/shared.actions';
import { of } from 'rxjs';
import { AlertInfo } from 'src/app/core/models/alert.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private webStorageService: WebStorageService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromLoginAction.loginRequest),
      exhaustMap((action) => {
        this.spinnerService.show();

        return this.authService.login(action.email, action.password).pipe(
          map((userCredential) => {
            this.spinnerService.hide();

            const user = this.populateUser(userCredential.user.toJSON());

            this.webStorageService.set({
              key: 'user',
              value: user,
              storageLocation: 'sessionStorage',
            });

            return fromLoginAction.loginSuccess({ user });
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.toastrService.error(this.getErrorMessage(err), 'Error');

            return of(setMessage({ message: this.getErrorMessage(err) }));
          })
        );
      })
    );
  });

  redirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromLoginAction.loginSuccess, fromLoginAction.signupSuccess),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  signup$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromLoginAction.signupRequest),
      exhaustMap((action) => {
        this.spinnerService.show();

        return this.authService.signup(action.email, action.password).pipe(
          map((userCredential) => {
            this.spinnerService.hide();
            const user = this.populateUser(userCredential.user.toJSON());

            this.webStorageService.set({
              key: 'user',
              value: user,
              storageLocation: 'sessionStorage',
            });

            return fromLoginAction.signupSuccess({ user });
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.toastrService.error(this.getErrorMessage(err), 'Error');

            return of(setMessage({ message: this.getErrorMessage(err) }));
          })
        );
      })
    );
  });

  signout$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromLoginAction.signoutRequest),
        tap((action) => {
          this.authService.signout();
          this.webStorageService.clear({ storageLocation: 'sessionStorage' });
          this.router.navigate(['/auth/login']);
        })
      );
    },
    { dispatch: false }
  );

  userSession$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromLoginAction.userSessionHasRequested),
      mergeMap((action) => {
        const userSession = this.webStorageService.get({
          key: 'user',
          storageLocation: 'sessionStorage',
        });
        const user = userSession ? this.populateUser(userSession, true) : null;

        return of(fromLoginAction.userSessionHasSucceeded({ user }));
      })
    );
  });

  passwordReset$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromLoginAction.passwordResetRequested),
        tap((action) => {
          this.authService.resetPassword(action.email);
        })
      );
    },
    { dispatch: false }
  );

  userReAuthentication$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromLoginAction.userReAuthenticationRequest),
      switchMap((action) => {
        this.spinnerService.show();
        return this.authService
          .reAuthenticate(action.email, action.password)
          .pipe(
            map((userCredential) => {
              // We don't need the argument as long as it will not fail
              // then execute the next action
              this.spinnerService.hide();
              return fromLoginAction.userReAuthenticationSuccess({
                reAuthenticated: true,
              });
            }),
            catchError((err) => {
              this.spinnerService.hide();
              this.toastrService.error(this.getErrorMessage(err), 'Error');
              return of(setMessage({ message: this.getErrorMessage(err) }));
            })
          );
      })
    );
  });

  changePassword$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromLoginAction.changePasswordRequest),
      exhaustMap((action) => {
        return this.authService.changePassword(action.password).pipe(
          map((data) => {
            this.spinnerService.hide();
            this.toastrService.success(
              'New password has been successfully set!',
              'Change password'
            );
            return fromLoginAction.changePasswordSuccess();
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.toastrService.error(this.getErrorMessage(err), 'Error');
            return of(setMessage({ message: this.getErrorMessage(err) }));
          })
        );
      })
    );
  });

  private populateUser(response: any, fromWebStorage: boolean = false): User {
    return {
      accessToken: response.stsTokenManager?.accessToken,
      email: response.email,
      refreshToken: response.stsTokenManager?.refreshToken,
      expirationTime: +response.stsTokenManager?.expirationTime,
      uid: response.uid,
    };
  }

  private getErrorMessage(err: any): string {
    if (err instanceof HttpErrorResponse) {
      console.log(`error goes here`);
      return err.error.error.message;
    }
    return err.message;
  }
}
