import { authReducer } from '../auth/state/auth.reducer';
import { sharedReducer } from '../shared/state/shared.reducer';
import { SharedState } from '../shared/state/shared.state';
import { taskReducer } from '../todo/state/task.reducer';
import { TasksState } from '../todo/state/task.state';

export interface AppState {
  tasks: TasksState;
  shared: SharedState;
}

export const appReducer = {
  auth: authReducer,
  shared: sharedReducer,
  tasks: taskReducer,
};
