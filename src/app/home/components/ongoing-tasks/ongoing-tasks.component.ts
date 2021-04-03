import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/core/store/app.state';
import { setTobeDeletedTaskRequest } from 'src/app/core/store/shared/shared.actions';
import {
  deleteTaskRequested,
  loadOngoingTasksRequested,
} from 'src/app/core/store/todo/task.actions';
import { selectOngoingTasks } from 'src/app/core/store/todo/task.selectors';

@Component({
  selector: 'app-ongoing-tasks',
  templateUrl: './ongoing-tasks.component.html',
  styleUrls: ['./ongoing-tasks.component.scss'],
})
export class OngoingTasksComponent implements OnInit {
  onGoingTasks$: Observable<Task[]>;
  onGoingTasksHeader = 'On going tasks';
  constructor(private store: Store<AppState>, private modalService: NgbModal) {}
  deleteModalReference: ElementRef;

  ngOnInit(): void {
    this.store.dispatch(loadOngoingTasksRequested());
    this.onGoingTasks$ = this.store.select(selectOngoingTasks);
  }

  getModalReference($event): void {
    this.deleteModalReference = $event;
  }

  openModal(event: Event, content, task: Task): void {
    event.preventDefault();

    this.store.dispatch(
      setTobeDeletedTaskRequest({ tobeDeletedTask: { ...task } })
    );

    this.modalService.open(content).result.then((result) => {
      if (result == 'confirm') {
        this.store.dispatch(deleteTaskRequested({ id: task.id }));
      }
    });
  }
}
