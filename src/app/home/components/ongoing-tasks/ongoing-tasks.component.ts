import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/core/store/app.state';
import { loadOngoingTasksRequested } from 'src/app/core/store/todo/task.actions';
import { getOngoingTasks } from 'src/app/core/store/todo/task.selectors';

@Component({
  selector: 'app-ongoing-tasks',
  templateUrl: './ongoing-tasks.component.html',
  styleUrls: ['./ongoing-tasks.component.scss'],
})
export class OngoingTasksComponent implements OnInit {
  onGoingTasks$: Observable<Task[]>;
  onGoingTasksHeader = 'On going tasks';
  constructor(private store: Store<AppState>, private modalService: NgbModal) {}
  deleteModalReference: ElementRef;

  ngOnInit(): void {
    this.store.dispatch(loadOngoingTasksRequested());
    this.onGoingTasks$ = this.store.select(getOngoingTasks);
  }

  getModalReference($event): void {
    this.deleteModalReference = $event;
  }

  openDeleteModal(event: Event, content): void {
    event.preventDefault();
    this.modalService.open(content).result.then((result) => {
      console.log(result);
    });
  }
}
