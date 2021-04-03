import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { getUser } from 'src/app/auth/state/auth.selectors';
import { AppState } from 'src/app/core/store/app.state';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { ITaskService } from './itask.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements ITaskService {
  private COLLECTION_NAME = 'tasks';
  private user: User;

  constructor(
    private firebase: AngularFirestore,
    private store: Store<AppState>
  ) {
    this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });
  }

  getOnGoingTasks() {
    return from(
      this.firebase.firestore
        .collection(this.COLLECTION_NAME)
        .where('userId', '==', this.user.uid)
        .where('isDone', '==', false)
        .orderBy('createdDate', 'desc')
        .get()
    );
  }

  getCompletedTasks(pageNo: number, pageSize: number) {
    return from(
      this.firebase.firestore
        .collection(this.COLLECTION_NAME)
        .where('userId', '==', this.user.uid)
        .where('finishedDate', '!=', null)
        .orderBy('finishedDate', 'desc')
        .limit(!pageSize ? 10 : pageSize)
        .get()
    );
  }

  getTask(task: Task) {
    return from(
      this.firebase.firestore
        .collection(this.COLLECTION_NAME)
        .where('userId', '==', this.user.uid)
        .where('id', '==', task.id)
        .get()
    );
  }

  addTask(task: Task) {
    return from(this.firebase.collection(this.COLLECTION_NAME).add(task));
  }

  updateTask(task: Task) {
    const updatedTask = { ...task };
    delete updatedTask.id;
    return from(
      this.firebase
        .doc(`/${this.COLLECTION_NAME}/${task.id}`)
        .update(updatedTask)
    );
  }

  deleteTask(id: string) {
    return from(
      this.firebase.firestore.doc(`${this.COLLECTION_NAME}/${id}`).delete()
    );
  }
}
