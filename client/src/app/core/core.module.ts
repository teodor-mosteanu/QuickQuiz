import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';


@NgModule({
  declarations: [
    NavComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    NavComponent,
  ]
})
export class CoreModule { }
