export interface Task {
  id?: string;
  description: string;
  isDone: boolean;
  userId: string;
  createdDate: Date;
  finishedDate: Date;
}