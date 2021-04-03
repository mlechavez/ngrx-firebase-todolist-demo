import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { TaskService } from 'src/app/core/services/firestore-task.service';
import { setMessage } from 'src/app/core/store/shared/shared.actions';
import * as fromTaskActions from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  loadOnGoingTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTaskActions.loadOngoingTasksRequested),
      switchMap((action) => {
        this.spinnerService.show();
        return this.taskService.getOnGoingTasks().pipe(
          map((querySnapshot) => {
            let tasks = [];
            querySnapshot.forEach((doc) => {
              tasks.push({ ...(doc.data() as {}), id: doc.id });
            });
            this.spinnerService.hide();
            return fromTaskActions.loadOngoingTasksSucceeded({
              onGoingTasks: tasks,
            });
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.toastrService.show(this.getErrorMessage(err), 'Error');
            return of(setMessage({ message: this.getErrorMessage(err) }));
          })
        );
      })
    );
  });

  loadCompletedTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTaskActions.loadCompletedTasksRequested),
      switchMap((action) => {
        this.spinnerService.show();

        return this.taskService.getCompletedTasks(1, 10).pipe(
          map((querySnapshot) => {
            let tasks = [];

            querySnapshot.forEach((item) => {
              tasks.push({ ...(item.data() as {}), id: item.id });
            });

            this.spinnerService.hide();

            return fromTaskActions.loadCompletedTasksSucceeded({
              completedTasks: tasks,
            });
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.toastrService.error(this.getErrorMessage(err), 'Error');
            return of(setMessage({ message: this.getErrorMessage(err) }));
          })
        );
      })
    );
  });

  addTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTaskActions.addTodoRequested),
      exhaustMap((action) => {
        this.spinnerService.show();

        return this.taskService.addTask(action.task).pipe(
          map((task) => {
            this.spinnerService.hide();
            this.toastrService.success(
              `${action.task.description} has been added!`
            );
            return fromTaskActions.addTodoSucceeded({
              task: { ...action.task, id: task.id },
            });
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.toastrService.error(this.getErrorMessage(err), 'Error');
            return of(setMessage({ message: this.getErrorMessage(err) }));
          })
        );
      })
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTaskActions.updateTaskRequested),
      exhaustMap((action) => {
        return this.taskService.updateTask(action.task).pipe(
          map((data) => {
            this.toastrService.success(
              `${action.task.description} has been updated!`
            );
            return fromTaskActions.updateTaskSucceeded({ task: action.task });
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.toastrService.error(this.getErrorMessage(err), 'Error');
            return of(setMessage({ message: this.getErrorMessage(err) }));
          })
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTaskActions.deleteTaskRequested),
      exhaustMap((action) => {
        this.spinnerService.show();
        return this.taskService.deleteTask(action.id).pipe(
          map((data) => {
            this.spinnerService.hide();
            this.toastrService.warning(
              `action with id: ${action.id} has been deleted!`
            );
            return fromTaskActions.deleteTaskSucceeded({ id: action.id });
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.toastrService.error(this.getErrorMessage(err), 'Error');
            return of(setMessage({ message: this.getErrorMessage(err) }));
          })
        );
      })
    );
  });

  private getErrorMessage(errResponse: any): string {
    if (errResponse instanceof HttpErrorResponse) {
      return errResponse?.message;
    }
    return errResponse.message;
  }
}
