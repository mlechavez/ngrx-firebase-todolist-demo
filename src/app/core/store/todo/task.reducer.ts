import { createReducer, on } from '@ngrx/store';
import {
  addTodoSucceeded,
  deleteTaskSucceeded,
  loadOngoingTasksSucceeded,
  loadCompletedTasksSucceeded,
  updateTaskRequested,
  updateTaskSucceeded,
  filterAndSortOngoingTaskRequested,
  filterAndSortOngoingTaskSucceeded,
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
    let ongoingTasks;

    // Remove from the list if finished
    if (action.task.finishedDate) {
      ongoingTasks = state.onGoingTasks.filter((t) => t.id !== action.task.id);
    } else {
      ongoingTasks = state.onGoingTasks.map((t) => {
        return t.id === action.task.id ? action.task : t;
      });
    }

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
  }),
  on(filterAndSortOngoingTaskSucceeded, (state, action) => {
    return {
      ...state,
      onGoingTasks: [...action.onGoingTasks],
    };
  })
);

export function taskReducer(state, action) {
  return _taskReducer(state, action);
}
