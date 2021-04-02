import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../core/models/task.model';
import { AppState } from '../state/app.state';
import { loadCompletedTasksRequested } from '../todo/state/task.actions';
import { getCompletedTasks } from '../todo/state/task.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  completedTasks$: Observable<Task[]>;
  doneTasksTitle = 'Job well done!';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadCompletedTasksRequested());
    this.completedTasks$ = this.store.select(getCompletedTasks);
  }
}
