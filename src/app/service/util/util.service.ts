import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { getUser, getMerchantRequest } from 'src/app/state/auth/auth.selector';
import { UserModel } from '../user/user.model';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MerchantRequestModel } from '../merchant-request/merchant-request.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {}

  getUsersInitials(firstName: string, lastName: string): string {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }
  getJwtToken() {
    let token: any = undefined;
    this.store.select(getUser).subscribe((data) => (token = data?.token));
    return token;
  }

  getUserDetails() {
    let user: UserModel | undefined;
    this.store.select(getUser).subscribe((data) => (user = data));
    return user;
  }
  getMerchantRequest() {
    let result: MerchantRequestModel | undefined;
    this.store.select(getMerchantRequest).subscribe((data) => (result = data));
    return result;
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this.snackBar.open(message, action);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    }),
  };

  httpOptionsWithAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      Authorization: `Bearer ${this.getJwtToken()}`,
    }),
  };
}
