import { Task } from 'src/app/core/models/task.model';

export interface TasksState {
  tasks: Task[];
}

export const initialState: TasksState = {
  tasks: [],
};
