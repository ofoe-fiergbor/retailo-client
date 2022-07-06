import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {UserModel} from 'src/app/service/user/user.model';
import {AppState} from 'src/app/state/app.state';
import {getLoginStatus, getUser} from 'src/app/state/auth/auth.selector';
import {clearUserDetails} from 'src/app/state/auth/auth.action';
import {UtilService} from 'src/app/service/util/util.service';
import {Router} from '@angular/router';
import {clearCategoryState} from 'src/app/state/category/category.action';
import {clearProductState} from 'src/app/state/merchant-dashboard/merchant-dashboard.action';
import {getCart} from "../../state/shop/shop.selector";
import {clearShopState} from "../../state/shop/shop.action";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user?: UserModel;
  nameInitials!: string;
  numberOfCartElements: number = 0

  constructor(
    private store: Store<AppState>,
    private util: UtilService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadUserFromStore();
    this.loadLoginStatus();
    this.getCurrentCart();
  }

  getCurrentCart() {
    this.store.select(getCart).subscribe(data => this.numberOfCartElements = data.length)
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
    this.store.dispatch(clearCategoryState());
    this.store.dispatch(clearProductState());
    this.store.dispatch(clearShopState())
    this.router.navigate(['']);
  }
}
