import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginRequestPayload } from 'src/app/core/payloads/auth.payloads';
import {
  loginRequest,
  userReAuthenticationRequest,
} from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title: 'Login';
  loginRequest: LoginRequestPayload = {
    email: null,
    password: null,
  };

  @Input() isReAuthenticateRequest: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onLoginSubmit(): void {
    const credentials = { ...this.loginRequest };

    if (!this.isReAuthenticateRequest) {
      this.store.dispatch(
        loginRequest({
          email: credentials.email,
          password: credentials.password,
        })
      );
    } else {
      this.store.dispatch(
        userReAuthenticationRequest({
          email: credentials.email,
          password: credentials.password,
        })
      );
    }
  }
}
