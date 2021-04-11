import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import {
  changePasswordRequest,
  userReAuthenticationRequest,
} from '../../../core/store/auth/auth.actions';
import { getReAuthenticated } from '../../../core/store/auth/auth.selectors';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string;
  subTitle: string;

  reAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.reAuthenticated$ = this.store.select(getReAuthenticated);
    this.reAuthenticated$.subscribe((reAuthenticated) => {
      this.subTitle = reAuthenticated
        ? 'Enter your new password'
        : 'Before you can change your password. Please re-authenticate';
    });
  }

  onChangedPasswordSubmitted(): void {
    this.store.dispatch(changePasswordRequest({ password: this.newPassword }));
  }
}
