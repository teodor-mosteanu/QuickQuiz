import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appLogo, appTitle } from '../_constants/constants';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};

  logo = appLogo;
  title = appTitle;

  constructor(public accountService: AccountService, private router: Router) {}
  loggedUserName;
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      this.loggedUserName = user?.username;
    });
  }

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      this.router.navigateByUrl('/tests');
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
