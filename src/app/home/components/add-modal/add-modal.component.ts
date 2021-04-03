import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task, TaskStatus } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  title = 'Add a new task';
  task: Task;

  keys = Object.keys;
  taskStatus = TaskStatus;
  constructor(private activeModal: NgbActiveModal) {
    this.task = {
      description: null,
      status: 'Not started',
      userId: null,
      createdDate: null,
    };
  }
  ngOnInit(): void {}

  emitData(): void {
    this.task.createdDate = new Date().toJSON();
    this.activeModal.close(this.task);
  }

  dismiss(): void {
    this.activeModal.dismiss('cancel');
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
}
