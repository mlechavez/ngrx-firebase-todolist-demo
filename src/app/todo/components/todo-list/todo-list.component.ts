import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from 'src/app/auth/state/auth.selectors';
import { Task } from 'src/app/core/models/task.model';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/app.state';
import {
  deleteTaskRequested,
  loadOngoingTasksRequested,
  updateTaskRequested,
} from '../../../core/store/todo/task.actions';
import { selectOngoingTasks } from '../../../core/store/todo/task.selectors';

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
    this.tasks$ = this.store.select(selectOngoingTasks);
    this.store.dispatch(loadOngoingTasksRequested());
    this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });
  }

  onTaskUpdated(task: Task): void {
    // const updatedTask = {
    //   id: task.id,
    //   description: task.description,
    //   isDone: !task.isDone,
    //   userId: this.user.uid,
    //   createdDate: task.createdDate,
    //   finishedDate: !task.isDone ? new Date().toJSON() : null,
    // };
    // this.store.dispatch(updateTaskRequested({ task: updatedTask }));
  }

  onTaskDeleted(id: string): void {
    // this.store.dispatch(deleteTaskRequested({ id }));
  }
}
