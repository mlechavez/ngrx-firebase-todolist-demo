import { createReducer, on } from '@ngrx/store';
import {
  addTodoSucceeded,
  deleteTaskSucceeded,
  loadOngoingTasksSucceeded,
  loadCompletedTasksSucceeded,
  updateTaskRequested,
} from './task.actions';
import { initialState } from './task.state';

export const _taskReducer = createReducer(
  initialState,
  on(addTodoSucceeded, (state, action) => {
    return {
      ...state,
      onGoingTasks: [...state.onGoingTasks, { ...action.task }],
    };
  }),
  on(updateTaskRequested, (state, action) => {
    const updatedTasks = state.onGoingTasks.map((t) => {
      return t.id === action.task.id ? action.task : t;
    });
    return {
      ...state,
      onGoingTasks: updatedTasks,
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
      onGoingTasks: action.onGoingTasks,
    };
  }),
  on(loadCompletedTasksSucceeded, (state, action) => {
    return {
      ...state,
      completedTasks: action.completedTasks,
    };
  })
);

export function taskReducer(state, action) {
  return _taskReducer(state, action);
}
