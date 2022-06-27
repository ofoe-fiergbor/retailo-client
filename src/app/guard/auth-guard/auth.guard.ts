import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { getLoginStatus } from 'src/app/state/auth/auth.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn!: boolean;
  constructor(private store: Store<AppState>, private router: Router) {
    store
      .select(getLoginStatus)
      .subscribe((data) => (this.isLoggedIn = data));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn ? true : this.router.navigate(['authenticate']);;
  }
  
}
