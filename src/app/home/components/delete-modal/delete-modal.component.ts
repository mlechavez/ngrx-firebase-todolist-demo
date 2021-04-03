import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Task } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/core/store/app.state';
import { selectTobeDeletedTask } from 'src/app/core/store/shared/shared.selectors';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit, AfterViewInit {
  title = 'Delete task';
  @ViewChild('deleteTask') deleteTask: ElementRef;

  task: Task;
  @Output() deleteTaskInit = new EventEmitter<ElementRef>();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('initialized');
    this.store.select(selectTobeDeletedTask).subscribe((data) => {
      this.task = data;
    });
  }

  ngAfterViewInit(): void {
    this.deleteTaskInit.emit(this.deleteTask);
  }
}
