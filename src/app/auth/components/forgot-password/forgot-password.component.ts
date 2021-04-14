import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PasswordResetRequestPayload } from 'src/app/core/payloads/auth.payloads';
import { AppState } from 'src/app/core/store/app.state';
import { passwordResetRequested } from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  passwordResetRequest: PasswordResetRequestPayload = {
    email: null,
  };
  submitted = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onPasswordReset() {
    this.store.dispatch(
      passwordResetRequested({ email: this.passwordResetRequest.email })
    );
    this.submitted = !this.submitted;
  }
}
