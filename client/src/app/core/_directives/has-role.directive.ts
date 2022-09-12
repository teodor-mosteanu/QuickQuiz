import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { User } from '../_models/user.interface';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {}
  ngOnInit() {
    this.accountService.currentUser$.subscribe((user) => {
      this.user = user;
      this.checkPermission();
    });
  }

  checkPermission() {
    if (!this.user?.role || this.user === null) {
      this.viewContainerRef.clear();
      return;
    }
    if (this.appHasRole.includes(this.user?.role)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
