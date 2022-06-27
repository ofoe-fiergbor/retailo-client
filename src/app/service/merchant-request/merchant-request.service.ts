import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL } from '../../../assets/keys';
import { UtilService } from '../util/util.service';
import {
  AllMerchantRequests,
  MerchantRequest,
  MerchantRequestModel,
  UpdateMerchantRequest,
} from './merchant-request.model';

@Injectable({
  providedIn: 'root',
})
export class MerchantRequestService {
  constructor(private http: HttpClient, private util: UtilService) {}

  makeMerchantRequest(body: MerchantRequest) {
    return this.http.post<MerchantRequestModel>(
      `${ROOT_URL}/v1/seller/request`,
      body,
      this.util.httpOptionsWithAuthorization
    );
  }

  //admin
  updateMerchantRequest(body: UpdateMerchantRequest, userId?: number) {
    return this.http.put<MerchantRequestModel>(
      `${ROOT_URL}/v1/seller/${userId}`,
      body,
      this.util.httpOptionsWithAuthorization
    );
  }

  withdrawMerchantRequest(userId?: number) {
    return this.http.delete(
      `${ROOT_URL}/v1/seller/${userId}`,
      this.util.httpOptionsWithAuthorization
    );
  }
  getAllRequests() {
    return this.http.get<AllMerchantRequests>(
      `${ROOT_URL}/v1/seller`,
      this.util.httpOptionsWithAuthorization
    );
  }

  getSingleRequest(id?: number) {
    return this.http.get<MerchantRequestModel>(
      `${ROOT_URL}/v1/seller/${id}`,
      this.util.httpOptionsWithAuthorization
    );
  }
}
