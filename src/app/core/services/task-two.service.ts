import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = `https://todolist-9ceed-default-rtdb.firebaseio.com`;

  constructor(private http: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks.json`).pipe(
      map((data) => {
        const tasks: Task[] = [];

        for (let key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            tasks.push({ ...data[key], id: key });
          }
        }
        return tasks;
      })
    );
  }

  getTask(task: Task): Observable<Task> {
    return this.http
      .get<Task>(
        `${this.baseUrl}/tasks/json?id=${task.id}&userId=${task.userId}`
      )
      .pipe(
        map((data) => {
          let task: Task;

          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              task = { ...data[key], id: key };
            }
          }
          return task;
        })
      );
  }

  addTask(task: Task): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${this.baseUrl}/tasks.json`,
      task,
      this.httpHeader
    );
  }

  updateTask(task: Task) {
    const patchData = {
      [task.id]: {
        description: task.description,
        isDone: task.isDone,
        userId: task.userId,
        createdDate: task.createdDate,
        finishedDate: task.finishedDate,
      },
    };
    // const putData = {
    //   [task.id]: {
    //     description: task.description,
    //     isDone: task.isDone,
    //     userId: task.userId,
    //   },
    // };

    return this.http.patch(`${this.baseUrl}/tasks.json`, patchData);
    // return this.http.put(`${this.baseUrl}/tasks.json?id=${task.id}`, putData);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/tasks.json?id=${id}`);
  }
}
