export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface AuthResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface SignupRequestPayload {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface PasswordResetRequestPayload {
  email: string;
}
