import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from 'src/app/auth/state/auth.selectors';
import { Task } from 'src/app/core/models/task.model';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/state/app.state';
import {
  deleteTaskRequested,
  loadAllTasksRequested,
  updateTaskRequested,
} from '../../state/task.actions';
import { getTasks } from '../../state/task.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  user: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
    this.store.dispatch(loadAllTasksRequested());
    this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });
  }

  onTaskUpdated(task: Task): void {
    const updatedTask = {
      id: task.id,
      description: task.description,
      isDone: !task.isDone,
      userId: this.user.uid,
      createdDate: task.createdDate,
      finishedDate: !task.isDone ? new Date() : null,
    };
    this.store.dispatch(updateTaskRequested({ task: updatedTask }));
  }

  onTaskDeleted(id: string): void {
    this.store.dispatch(deleteTaskRequested({ id }));
  }
}
