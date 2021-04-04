import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getUser } from '../auth/state/auth.selectors';
import { Task, TaskStatus } from '../core/models/task.model';
import { User } from '../core/models/user.model';
import { AppState } from '../core/store/app.state';
import { addTodoRequested } from '../core/store/todo/task.actions';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ModalConfig } from '../shared/config/modal.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') private modalComponent: ModalComponent;
  modalConfig: ModalConfig;
  user: User;
  task: Task;
  keys = Object.keys;
  taskStatus = TaskStatus;

  constructor(private store: Store<AppState>) {
    this.task = new Task();
    this.modalConfig = this.initializeModalConfig();
  }
  ngOnInit(): void {
    this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });
  }

  openModal(): void {
    this.modalComponent.open().then((result) => {
      if (result === 'close') {
        this.task.userId = this.user.uid;
        this.task.createdDate = new Date().toJSON();

        this.store.dispatch(addTodoRequested({ task: { ...this.task } }));
      }
    });
  }

  convertStatus(status): string {
    switch (status) {
      case 'NOT_STARTED':
        return 'Not started';
      case 'IN_PROGRESS':
        return 'In progress';
      default:
        return 'Completed';
    }
  }

  private initializeModalConfig(): ModalConfig {
    return {
      title: 'Add task',
      closeButtonLabel: 'Submit',
      dismissButtonLabel: 'Cancel',
      closeButtonCss: 'btn btn btn-outline-success',
    };
  }
}
