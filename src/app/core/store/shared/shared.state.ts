import { AlertInfo } from 'src/app/core/models/alert.model';

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
