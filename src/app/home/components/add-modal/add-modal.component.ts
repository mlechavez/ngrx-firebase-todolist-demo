import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  title = 'Add a new task';
  task: Task;
  constructor(private activeModal: NgbActiveModal) {
    this.task = {
      description: null,
      isDone: false,
      userId: null,
      createdDate: null,
      finishedDate: null,
    };
  }
  ngOnInit(): void {}

  emitData(): void {
    this.task.createdDate = new Date();
    this.activeModal.close(this.task);
  }

  dismiss(): void {
    this.activeModal.dismiss('cancel');
  }
}
