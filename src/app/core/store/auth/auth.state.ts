import { User } from 'src/app/core/models/user.model';

export interface AuthState {
  user: User;
  reAuthenticated: boolean;
}

export const initialState: AuthState = {
  user: null,
  reAuthenticated: false,
};
