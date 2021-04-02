import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/state/app.state';
import { loadOngoingTasksRequested } from 'src/app/todo/state/task.actions';
import { getOngoingTasks } from 'src/app/todo/state/task.selectors';

@Component({
  selector: 'app-ongoing-tasks',
  templateUrl: './ongoing-tasks.component.html',
  styleUrls: ['./ongoing-tasks.component.scss'],
})
export class OngoingTasksComponent implements OnInit {
  onGoingTasks$: Observable<Task[]>;
  onGoingTasksHeader = 'On going tasks';
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadOngoingTasksRequested());
    this.onGoingTasks$ = this.store.select(getOngoingTasks);
  }
}
