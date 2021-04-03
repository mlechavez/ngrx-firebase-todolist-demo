import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from 'src/app/auth/state/auth.selectors';
import { AlertInfo } from 'src/app/core/models/alert.model';
import { Task } from 'src/app/core/models/task.model';
import { User } from 'src/app/core/models/user.model';
import { selectAlertInfo } from 'src/app/core/store/shared/shared.selectors';
import { AppState } from 'src/app/core/store/app.state';
import { addTodoRequested } from '../../../core/store/todo/task.actions';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  task: Task = {
    id: null,
    description: null,
    isDone: false,
    userId: null,
    createdDate: null,
    finishedDate: null,
  };

  alertInfo$: Observable<AlertInfo>;
  user: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.alertInfo$ = this.store.select(selectAlertInfo);
    this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });
  }

  onTaskSubmitted(): void {
    this.task.userId = this.user.uid;
    this.task.createdDate = new Date();
    this.store.dispatch(addTodoRequested({ task: { ...this.task } }));
    this.task.description = '';
  }
}
