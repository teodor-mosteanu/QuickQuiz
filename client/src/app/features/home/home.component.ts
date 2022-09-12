import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LearnComponent } from 'src/app/shared/learn/learn.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  learnMore = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(LearnComponent);
  }
}
