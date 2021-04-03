import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Task, TaskStatus } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/core/store/app.state';
import {
  deleteTaskRequested,
  loadOngoingTasksRequested,
  updateTaskRequested,
} from 'src/app/core/store/todo/task.actions';
import { selectOngoingTasks } from 'src/app/core/store/todo/task.selectors';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import * as _ from 'lodash';
import { CompleteModalComponent } from '../complete-modal/complete-modal.component';

@Component({
  selector: 'app-ongoing-tasks',
  templateUrl: './ongoing-tasks.component.html',
  styleUrls: ['./ongoing-tasks.component.scss'],
})
export class OngoingTasksComponent implements OnInit, OnDestroy {
  onGoingTasks$: Observable<Task[]>;
  onGoingTasks: Task[];
  onGoingTasksSubscription: Subscription;
  onGoingTasksHeader = 'On going tasks';
  total = 0;
  keys = Object.keys;
  taskStatus = TaskStatus;

  constructor(private store: Store<AppState>, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.store.dispatch(loadOngoingTasksRequested());

    this.onGoingTasksSubscription = this.store
      .select(selectOngoingTasks)
      .subscribe((data) => {
        this.onGoingTasks = _.cloneDeep(data);
      });
  }

  openModal(event: Event, task: Task): void {
    event.preventDefault();

    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.task = task;

    modalRef.result.then((task) => {
      this.store.dispatch(deleteTaskRequested({ id: task.id }));
    });
  }

  onStatusChanged(task: Task): void {
    if (task.status.toLocaleLowerCase() === 'completed') {
      const modalRef = this.modalService.open(CompleteModalComponent);
      modalRef.componentInstance.task = task;
      modalRef.result.then((result) => {
        this.store.dispatch(updateTaskRequested({ task: { ...result } }));
      });
    } else {
      this.store.dispatch(updateTaskRequested({ task: { ...task } }));
    }
  }
  convertStatus(status): string {
    // console.log((this.total += 1));
    let result;
    switch (status) {
      case 'NOT_STARTED':
        result = 'Not started';
        break;
      case 'IN_PROGRESS':
        result = 'In progress';
        break;
      default:
        result = 'Completed';
        break;
    }
    return result;
  }

  ngOnDestroy(): void {
    this.onGoingTasksSubscription.unsubscribe();
  }
}
