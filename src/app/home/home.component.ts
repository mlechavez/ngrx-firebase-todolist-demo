import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { getUser } from '../auth/state/auth.selectors';
import { Task } from '../core/models/task.model';
import { User } from '../core/models/user.model';
import { AppState } from '../core/store/app.state';
import { addTodoRequested } from '../core/store/todo/task.actions';
import { AddModalComponent } from './components/add-modal/add-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private store: Store<AppState>, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });
  }

  openModal(): void {
    const modalRef = this.modalService.open(AddModalComponent);

    modalRef.componentInstance.task = {
      description: null,
      isDone: false,
      userId: this.user.uid,
      createdDate: null,
      finishedDate: null,
    };

    modalRef.result.then((task) => {
      this.store.dispatch(addTodoRequested({ task: { ...task } }));
    });
  }
}
