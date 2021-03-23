import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { IAuthService } from './iauth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password));
  }

  signup(email: string, password: string) {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password));
  }

  signout() {
    this.fireAuth.signOut();
  }

  sendEmailVerification() {
    throw new Error('Method not implemented.');
  }

  resetPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email);
  }

  changePassword(password: string) {
    return from(
      this.fireAuth.currentUser.then((user) => {
        user.updatePassword(password);
      })
    );
  }

  reAuthenticate(email: string, password: string) {
    const authCredential = firebase.default.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return from(
      this.fireAuth.currentUser.then((user) => {
        return user.reauthenticateWithCredential(authCredential);
      })
    );
  }
}
