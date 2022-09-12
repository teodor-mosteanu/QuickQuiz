import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearnComponent } from './learn/learn.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatCardModule} from '@angular/material/card';
import { EditQuestionComponent } from './edit-question/edit-question.component';

@NgModule({
  declarations: [
    LearnComponent,
    EditQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    MatCardModule
  ],
  exports: [
    FormsModule,
    BsDropdownModule,
    ToastrModule,
    MatCardModule
  ]
})
export class SharedModule { }
