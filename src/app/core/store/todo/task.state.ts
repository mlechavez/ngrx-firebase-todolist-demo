import { Task } from 'src/app/core/models/task.model';

export interface TasksState {
  onGoingTasks: Task[];
  completedTasks: Task[];
  filteredOngoingTasks: Task[];
}

export const initialState: TasksState = {
  onGoingTasks: [],
  completedTasks: [],
  filteredOngoingTasks: [],
};
