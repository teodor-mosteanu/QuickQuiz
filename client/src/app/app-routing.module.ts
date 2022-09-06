import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/_guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { TestDetailsComponent } from './features/test-list/test-details/test-details.component';
import { TestListComponent } from './features/test-list/test-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'tests', component: TestListComponent, canActivate:[AuthGuard]},
      {path: 'tests/:id', component: TestDetailsComponent},
    ]

  },
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
