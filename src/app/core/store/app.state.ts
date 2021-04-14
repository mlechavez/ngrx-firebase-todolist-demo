import { authReducer } from './auth.reducer';
import { sharedReducer } from './shared/shared.reducer';
import { SharedState } from './shared/shared.state';
import { taskReducer } from './todo/task.reducer';
import { TasksState } from './todo/task.state';

export interface AppState {
  tasks: TasksState;
  shared: SharedState;
}

export const appReducer = {
  auth: authReducer,
  shared: sharedReducer,
  tasks: taskReducer,
};
