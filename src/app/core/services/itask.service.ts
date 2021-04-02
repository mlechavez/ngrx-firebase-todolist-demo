import { Task } from '../models/task.model';

export interface ITaskService {
  getOnGoingTasks();
  getCompletedTasks(pageNo: number, pageSize: number);
  getTask(task: Task);
  addTask(task: Task);
  updateTask(task: Task);
  deleteTask(id: string);
}
