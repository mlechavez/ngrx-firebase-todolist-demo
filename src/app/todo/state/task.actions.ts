import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/core/models/task.model';

export const loadAllTasksRequested = createAction(
  '[Task List] Load All Tasks Requested'
);

export const loadAllTasksSucceeded = createAction(
  '[Task List] Load All Tasks Succeeded',
  props<{ tasks: Task[] }>()
);

export const loadCompletedTasksRequested = createAction(
  '[Completed Tasks] Load Completed Tasks Requested'
);

export const loadCompletedTasksSucceeded = createAction(
  '[Completed Tasks] Load Completed Tasks Succeeded',
  props<{ tasks: Task[] }>()
);

export const addTodoRequested = createAction(
  '[Add task] Add Task Requested',
  props<{ task: Task }>()
);

export const addTodoSucceeded = createAction(
  '[Add task] Add Task Succeeded',
  props<{ task: Task }>()
);

export const updateTaskRequested = createAction(
  '[Update Task] Update Task Requested',
  props<{ task: Task }>()
);

export const updateTaskSucceeded = createAction(
  '[Update Task] Update Task Succeeded',
  props<{ task: Task }>()
);

export const deleteTaskRequested = createAction(
  '[Delete Task] Delete Task Requested',
  props<{ id: string }>()
);

export const deleteTaskSucceeded = createAction(
  '[Task Delete] Delete Task Succeeded',
  props<{ id: string }>()
);
