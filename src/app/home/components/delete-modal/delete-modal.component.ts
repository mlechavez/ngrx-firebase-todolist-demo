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
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit, AfterViewInit {
  title = 'Delete task';
  @ViewChild('deleteTask') deleteTask: ElementRef;

  @Input() task: Task;
  @Output() deleteTaskInit = new EventEmitter<ElementRef>();
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.deleteTaskInit.emit(this.deleteTask);
  }
}
