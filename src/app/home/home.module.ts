import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { OngoingTasksComponent } from './components/ongoing-tasks/ongoing-tasks.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from './components/add-modal/add-modal.component';

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
    DeleteModalComponent,
    AddModalComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes), NgbModule],
})
export class HomeModule {}
