import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { OngoingTasksComponent } from './components/ongoing-tasks/ongoing-tasks.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusFilterComponent } from './components/filter-order-status/status-filter.component';

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
  declarations: [
    HomeComponent,
    OngoingTasksComponent,
    CompletedTasksComponent,
    StatusFilterComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes), NgbModule],
})
export class HomeModule {}
