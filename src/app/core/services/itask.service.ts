import { Task } from '../models/task.model';

export interface ITaskService {
  getTasks();
  getCompletedTasks();
  getTask(task: Task);
  addTask(task: Task);
  updateTask(task: Task);
  deleteTask(id: string);
}
