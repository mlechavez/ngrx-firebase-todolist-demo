import { createReducer, on } from '@ngrx/store';
import {
  addTodoSucceeded,
  deleteTaskSucceeded,
  loadOngoingTasksSucceeded,
  loadCompletedTasksSucceeded,
  updateTaskRequested,
  updateTaskSucceeded,
} from './task.actions';
import { initialState } from './task.state';

export const _taskReducer = createReducer(
  initialState,
  on(addTodoSucceeded, (state, action) => {
    return {
      ...state,
      onGoingTasks: [{ ...action.task }, ...state.onGoingTasks],
    };
  }),
  on(updateTaskSucceeded, (state, action) => {
    const ongoingTasks = state.onGoingTasks.filter(
      (t) => t.id !== action.task.id
    );

    return {
      ...state,
      onGoingTasks: [...ongoingTasks],
      completedTasks: [{ ...action.task }, ...state.completedTasks],
    };
  }),
  on(deleteTaskSucceeded, (state, action) => {
    const updatedTasks = state.onGoingTasks.filter((t) => t.id !== action.id);
    return {
      ...state,
      onGoingTasks: updatedTasks,
    };
  }),
  on(loadOngoingTasksSucceeded, (state, action) => {
    return {
      ...state,
      onGoingTasks: [...action.onGoingTasks],
    };
  }),
  on(loadCompletedTasksSucceeded, (state, action) => {
    return {
      ...state,
      completedTasks: [...action.completedTasks],
    };
  })
);

export function taskReducer(state, action) {
  return _taskReducer(state, action);
}
