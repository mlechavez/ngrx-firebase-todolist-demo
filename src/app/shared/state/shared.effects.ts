import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { setNgxSpinnerAction } from './shared.actions';

@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions, private spinner: NgxSpinnerService) {}

  spinner$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setNgxSpinnerAction),
        tap((action) => {
          action.loading ? this.spinner.show() : this.spinner.hide();
        })
      );
    },
    { dispatch: false }
  );
}
