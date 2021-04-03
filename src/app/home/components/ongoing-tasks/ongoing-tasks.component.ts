import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/core/store/app.state';

import {
  deleteTaskRequested,
  loadOngoingTasksRequested,
} from 'src/app/core/store/todo/task.actions';
import { selectOngoingTasks } from 'src/app/core/store/todo/task.selectors';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-ongoing-tasks',
  templateUrl: './ongoing-tasks.component.html',
  styleUrls: ['./ongoing-tasks.component.scss'],
})
export class OngoingTasksComponent implements OnInit {
  onGoingTasks$: Observable<Task[]>;
  onGoingTasksHeader = 'On going tasks';
  constructor(private store: Store<AppState>, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.store.dispatch(loadOngoingTasksRequested());
    this.onGoingTasks$ = this.store.select(selectOngoingTasks);
  }

  openModal(event: Event, task: Task): void {
    event.preventDefault();

    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.task = task;

    modalRef.result.then((task) => {
      this.store.dispatch(deleteTaskRequested({ id: task.id }));
    });
  }
}
