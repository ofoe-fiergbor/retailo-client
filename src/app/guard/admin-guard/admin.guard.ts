import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/service/user/user.model';
import { getUser } from 'src/app/state/auth/auth.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userDetails?: UserModel;
  constructor(private store: Store<AppState>, private router: Router) {
    store
      .select(getUser)
      .subscribe((data) => (this.userDetails = data));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userDetails?.role === 'ADMIN'
      ? true
      : this.router.navigate(['']);
  }
  
}
