import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/service/user/user.model';
import { AppState } from 'src/app/state/app.state';
import { getUser, getLoginStatus } from 'src/app/state/auth/auth.selector';
import { clearUserDetails } from 'src/app/state/auth/auth.action';
import { UtilService } from 'src/app/service/util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user?: UserModel;
  nameInitials!: string;

  constructor(
    private store: Store<AppState>,
    private util: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserFromStore();
    this.loadLoginStatus();
  }

  loadLoginStatus() {
    this.store
      .select(getLoginStatus)
      .subscribe((data) => (this.isLoggedIn = data));
  }

  loadUserFromStore() {
    this.store.select(getUser).subscribe((data) => {
      this.user = data;
      this.setInitials(data?.firstName!, data?.lastName!);
    });
  }

  setInitials(firstName: string, lastName: string) {
    this.nameInitials = this.util.getUsersInitials(firstName, lastName);
  }

  logout() {
    this.store.dispatch(clearUserDetails());
    this.router.navigate(['']);
  }
}
