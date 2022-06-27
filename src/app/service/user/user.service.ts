import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AuthenticateUser,
  ProfileModel,
  RegisterUser,
  UpdateProfileRequest,
  UserModel,
} from './user.model';
import { ROOT_URL } from '../../../assets/keys';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private util: UtilService) {}

  registerNewUser(body: RegisterUser) {
    return this.http.post<any>(
      `${ROOT_URL}/v1/user/register`,
      body,
      this.util.httpOptions
    );
  }

  loginUser(user: AuthenticateUser) {
    return this.http.post<UserModel>(
      `${ROOT_URL}/v1/user/login`,
      user,
      this.util.httpOptions
    );
  }

  getUserProfile(userId?: number) {
    return this.http.get<ProfileModel>(
      `${ROOT_URL}/v1/user/${userId}`,
      this.util.httpOptionsWithAuthorization
    );
  }

  updateUserProfile(body: UpdateProfileRequest, userId: number) {
    return this.http.put<ProfileModel>(
      `${ROOT_URL}/v1/user/${userId}`,
      body,
      this.util.httpOptionsWithAuthorization
    );
  }

  errorMessage(code: number): string {
    switch (code) {
      case 409:
        return "There's already an account registerd to this email.";
      case 401:
        return 'You are trying to login with wrong credentials.';
      default:
        return 'Something went wrong. Kindly try again.';
    }
  }
}
