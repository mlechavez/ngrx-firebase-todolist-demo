import { AlertInfo } from 'src/app/core/models/alert.model';
import { Task } from '../../models/task.model';

export interface SharedState {
  loading: boolean;
  alertInfo: AlertInfo;
  message: string;
  tobeDeletedTask: Task;
}

export const initialState: SharedState = {
  loading: false,
  alertInfo: null,
  message: null,
  tobeDeletedTask: null,
};
