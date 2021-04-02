import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/state/app.state';
import { loadCompletedTasksRequested } from 'src/app/todo/state/task.actions';
import { getCompletedTasks } from 'src/app/todo/state/task.selectors';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
})
export class CompletedTasksComponent implements OnInit {
  completedTasks$: Observable<Task[]>;
  doneTasksTitle = 'Job well done!';
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadCompletedTasksRequested());

    this.completedTasks$ = this.store.select(getCompletedTasks);
  }
}
