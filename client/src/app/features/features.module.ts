import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestDetailsComponent } from './test-list/test-details/test-details.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { TestEditComponent } from './test-list/test-edit/test-edit.component';



@NgModule({
  declarations: [
    HomeComponent,
    TestListComponent,
    TestDetailsComponent,
    TestEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  exports: [
    HomeComponent
  ]
})
export class FeaturesModule { }
