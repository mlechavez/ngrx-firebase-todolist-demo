import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { TodoTimestampPipe } from './pipes/todo-timestamp.pipe';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    SiteHeaderComponent,
    SiteLayoutComponent,
    PageNotFoundComponent,
    AlertComponent,
    TodoTimestampPipe,
    ModalComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    SiteHeaderComponent,
    SiteLayoutComponent,
    AlertComponent,
    TodoTimestampPipe,
    ModalComponent,
  ],
})
export class SharedModule {}
