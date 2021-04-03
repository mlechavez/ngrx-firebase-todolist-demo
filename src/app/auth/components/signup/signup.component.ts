import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlertInfo } from 'src/app/core/models/alert.model';
import { SignupRequestPayload } from 'src/app/core/payloads/auth.payloads';
import { getAlertInfo } from 'src/app/core/store/shared/shared.selectors';
import { AppState } from 'src/app/core/store/app.state';
import { signupRequest } from '../../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupRequest: SignupRequestPayload = {
    email: null,
    password: null,
    confirmPassword: null,
  };

  alertInfo$: Observable<AlertInfo>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.alertInfo$ = this.store.select(getAlertInfo);
  }

  onSignupSubmit(): void {
    const signup = { ...this.signupRequest };
    this.store.dispatch(
      signupRequest({ email: signup.email, password: signup.password })
    );
  }
}
