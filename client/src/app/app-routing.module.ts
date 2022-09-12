import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { TestErrorsComponent } from './core/errors/test-errors.component';
import { AuthGuard } from './core/_guards/auth.guard';
import { PermissionGuard } from './core/_guards/permission.guard';
import { HomeComponent } from './features/home/home.component';
import { TestDetailsComponent } from './features/test-list/test-details/test-details.component';
import { TestEditComponent } from './features/test-list/test-edit/test-edit.component';
import { TestListComponent } from './features/test-list/test-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'tests', component: TestListComponent, canActivate:[AuthGuard]},
      {path: 'testView/:test/:id', component: TestDetailsComponent, canActivate: [PermissionGuard]},
      {path: 'testEdit/:test/:id', component: TestEditComponent, canActivate: [PermissionGuard]},
    ]

  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
