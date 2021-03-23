import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './task.state';

export const TASK_STATE_NAME = 'tasks';

const getTaskState = createFeatureSelector<TasksState>(TASK_STATE_NAME);

export const getTasks = createSelector(getTaskState, (state) => {
  return state.tasks;
});

export const getCompletedTasks = createSelector(getTaskState, (state) => {
  return state.tasks.filter((t) => t.finishedDate != null);
});
