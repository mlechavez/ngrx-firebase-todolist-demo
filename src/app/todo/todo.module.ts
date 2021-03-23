import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './state/task.reducer';
import { TASK_STATE_NAME } from './state/task.selectors';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './state/task.effects';

const routes: Routes = [{ path: '', component: TodoComponent }];

@NgModule({
  declarations: [TodoComponent, CreateTodoComponent, TodoListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class TodoModule {}
