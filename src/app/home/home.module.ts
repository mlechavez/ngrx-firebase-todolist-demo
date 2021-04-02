import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { OngoingTasksComponent } from './components/ongoing-tasks/ongoing-tasks.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';

const routes: Routes = [
  {
    path: '',

    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, OngoingTasksComponent, CompletedTasksComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
