import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearnComponent } from './learn/learn.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    LearnComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [
    FormsModule,
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
