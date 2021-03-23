import { AlertInfo } from 'src/app/core/models/alert.model';
import { User } from 'src/app/core/models/user.model';

export interface SharedState {
  loading: boolean;
  alertInfo: AlertInfo;
  message: string;
}

export const initialState: SharedState = {
  loading: false,
  alertInfo: null,
  message: null,
};
