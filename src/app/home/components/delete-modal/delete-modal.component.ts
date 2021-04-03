import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/core/store/app.state';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  title = 'Delete task';
  task: Task;
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  emitData(): void {
    this.activeModal.close(this.task);
  }

  dismiss(): void {
    this.activeModal.dismiss('cancel');
  }
}
