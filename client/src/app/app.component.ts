import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './core/_models/user.interface';
import { AccountService } from './core/_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'QuickQuizz';
  users: any;

  constructor(private http : HttpClient, private accountService: AccountService) {
  }

  ngOnInit() {
    this.getUsers()
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user)
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error)
    });
  }



}
