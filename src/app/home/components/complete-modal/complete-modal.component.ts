import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-complete-modal',
  templateUrl: './complete-modal.component.html',
  styleUrls: ['./complete-modal.component.scss'],
})
export class CompleteModalComponent implements OnInit {
  title = 'Confirmation';
  task: Task;
  constructor(private activeModal: NgbActiveModal) {
    this.task = new Task();
  }

  ngOnInit(): void {}

  confirm(): void {
    this.task.finishedDate = new Date().toJSON();
    this.activeModal.close(this.task);
  }

  dismiss(): void {
    this.activeModal.dismiss('cancel');
  }
}
