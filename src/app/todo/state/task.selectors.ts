import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './task.state';

export const TASK_STATE_NAME = 'tasks';

const getTaskState = createFeatureSelector<TasksState>(TASK_STATE_NAME);

export const getOngoingTasks = createSelector(getTaskState, (state) => {
  return state.onGoingTasks;
});

export const getCompletedTasks = createSelector(getTaskState, (state) => {
  return state.completedTasks.filter((t) => t.finishedDate != null);
});
