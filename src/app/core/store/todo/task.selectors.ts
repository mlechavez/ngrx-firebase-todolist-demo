import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './task.state';

export const TASK_STATE_NAME = 'tasks';

const selectTaskState = createFeatureSelector<TasksState>(TASK_STATE_NAME);

export const selectOngoingTasks = createSelector(selectTaskState, (state) => {
  return state.onGoingTasks;
});

export const selectCompletedTasks = createSelector(selectTaskState, (state) => {
  return state.completedTasks.filter((t) => t.finishedDate != null);
});
