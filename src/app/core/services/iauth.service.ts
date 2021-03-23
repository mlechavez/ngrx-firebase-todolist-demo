export interface IAuthService {
  login(email: string, password: string);
  signup(email: string, password: string);
  signout();
  sendEmailVerification();
  resetPassword(email: string);
  reAuthenticate(email: string, password: string);
  changePassword(password: string);
}
