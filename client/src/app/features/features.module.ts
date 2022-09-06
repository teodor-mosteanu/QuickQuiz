import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestDetailsComponent } from './test-list/test-details/test-details.component';



@NgModule({
  declarations: [
    HomeComponent,
    TestListComponent,
    TestDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class FeaturesModule { }
