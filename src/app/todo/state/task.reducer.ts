import { createReducer, on } from '@ngrx/store';
import {
  addTodoSucceeded,
  deleteTaskSucceeded,
  loadAllTasksSucceeded,
  loadCompletedTasksSucceeded,
  updateTaskRequested,
} from './task.actions';
import { initialState } from './task.state';

export const _taskReducer = createReducer(
  initialState,
  on(addTodoSucceeded, (state, action) => {
    return {
      ...state,
      tasks: [...state.tasks, { ...action.task }],
    };
  }),
  on(updateTaskRequested, (state, action) => {
    const updatedTasks = state.tasks.map((t) => {
      return t.id === action.task.id ? action.task : t;
    });
    return {
      ...state,
      tasks: updatedTasks,
    };
  }),
  on(deleteTaskSucceeded, (state, action) => {
    const updatedTasks = state.tasks.filter((t) => t.id !== action.id);
    return {
      ...state,
      tasks: updatedTasks,
    };
  }),
  on(loadAllTasksSucceeded, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
    };
  }),
  on(loadCompletedTasksSucceeded, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
    };
  })
);

export function taskReducer(state, action) {
  return _taskReducer(state, action);
}
