import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {ROOT_URL} from "../../../assets/keys";
import {AppState} from "../../state/app.state";
import {UtilService} from "../util/util.service";
import {CheckoutHistory, CheckoutTransactionRequestBody, CheckoutTransactionResponse} from "./transaction.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private util: UtilService,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  checkoutShoppingCart(body: CheckoutTransactionRequestBody) {
    return this.http.post<CheckoutTransactionResponse>(`${ROOT_URL}/v1/transactions/checkout`,
      body,
      this.util.httpOptionsWithAuthorization
    );
  }

  getCheckoutHistory(userId: number) {
    return this.http.get<CheckoutHistory>(`${ROOT_URL}/v1/transactions/checkout/${userId}`,
      this.util.httpOptionsWithAuthorization
    );
  }

}
