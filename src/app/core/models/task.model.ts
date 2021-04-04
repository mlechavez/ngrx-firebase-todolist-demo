export class Task {
  id?: string;
  description: string;
  isDone?: boolean;
  status?: string = 'Not started';
  userId: string;
  createdDate: string;
  finishedDate?: string = null;
}

export enum TaskStatus {
  NOT_STARTED = 'Not started',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}
