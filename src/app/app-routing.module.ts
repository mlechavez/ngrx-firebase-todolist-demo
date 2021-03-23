import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SiteLayoutComponent } from './shared/layout/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), // eagerly loaded --> added to appmodule
  },
  {
    path: 'auth',
    component: SiteLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule), // eagerly loaded --> added to appmodule
  },
  {
    path: 'tasks',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
