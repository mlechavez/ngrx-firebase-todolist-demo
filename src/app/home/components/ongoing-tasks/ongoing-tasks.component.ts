import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import * as _ from 'lodash';
import { ModalConfig } from 'src/app/shared/config/modal.config';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-ongoing-tasks',
  templateUrl: './ongoing-tasks.component.html',
  styleUrls: ['./ongoing-tasks.component.scss'],
})
export class OngoingTasksComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modalEdit') private modalEdit: ModalComponent;
  @ViewChild('modalComplete') private modalComplete: ModalComponent;
  @ViewChild('modalDelete') private modalDelete: ModalComponent;

  title = 'On going tasks';
  onGoingTasks: Task[];
  onGoingTasksSubscription: Subscription;
  taskInQuestion: Task;
  editModalConfig: ModalConfig;
  deleteModalConfig: ModalConfig;
  completeModalConfig: ModalConfig;
  keys = Object.keys;
  taskStatus = TaskStatus;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.taskInQuestion = new Task();
  }

  ngOnInit(): void {
    this.store.dispatch(loadOngoingTasksRequested());

    this.onGoingTasksSubscription = this.store
      .select(selectOngoingTasks)
      .subscribe((data) => {
        this.onGoingTasks = _.cloneDeep(data);
      });

    this.editModalConfig = {
      title: 'Edit task',
      closeButtonLabel: 'Submit',
      dismissButtonLabel: 'Cancel',
      closeButtonCss: 'btn btn btn-outline-success',
    };
    this.completeModalConfig = {
      title: 'Confirmation',
      closeButtonLabel: 'Submit',
      dismissButtonLabel: 'Cancel',
      closeButtonCss: 'btn btn btn-outline-success',
    };

    this.deleteModalConfig = {
      title: 'Delete task',
      closeButtonLabel: 'Submit',
      dismissButtonLabel: 'Cancel',
      closeButtonCss: 'btn btn btn-outline-danger',
    };
  }

  ngAfterViewInit(): void {
    // console.log(`ngAfterViewInitCalled`);
    // this.cdr.detectChanges();
  }

  onCardDblClick(task: Task): void {
    this.taskInQuestion = { ...task };

    this.modalEdit.open().then((result) => {
      if (result === 'close') {
        this.store.dispatch(
          updateTaskRequested({ task: { ...this.taskInQuestion } })
        );
      }
    });
  }

  onDeleteConfirmation(event: Event, task: Task): void {
    event.preventDefault();
    this.taskInQuestion = { ...task };

    this.modalDelete.open().then((result) => {
      if (result === 'close') {
        this.store.dispatch(deleteTaskRequested({ id: task.id }));
      }
    });
  }

  async onStatusChanged(task: Task): Promise<void> {
    if (task.status.toLocaleLowerCase() === 'completed') {
      this.taskInQuestion = { ...task };

      return await this.modalComplete.open().then((result) => {
        if (result === 'close') {
          task.finishedDate = new Date().toJSON();
          this.store.dispatch(updateTaskRequested({ task: { ...task } }));
        }
      });
    } else {
      this.store.dispatch(updateTaskRequested({ task: { ...task } }));
    }
  }
  convertStatus(status): string {
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
