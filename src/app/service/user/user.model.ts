export interface UserModel {
  id: number;
  role: string;
  email: string;
  token: string;
  phone: string;
  address: string;
  lastName: string;
  firstName: string;
  pictureUrl: string;
}

export interface UserUpdateResponse {
  id: number;
  role: string;
  email: string;
  phone: string;
  address: string;
  lastName: string;
  firstName: string;
  pictureUrl: string;
}

export interface RegisterUser{
  firstName: string;
  lastName: number;
  email: string;
  password: string;
}

export interface AuthenticateUser {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  phone: string;
  address: string;
  pictureUrl: string;
}

export interface ProfileModel {
  id: number;
  role: string;
  email: string;
  phone: string;
  address: string;
  lastName: string;
  firstName: string;
  pictureUrl: string;
}

export interface UpdateProfileRequest {
  phone: string;
  address: string;
  pictureUrl: string;
}


