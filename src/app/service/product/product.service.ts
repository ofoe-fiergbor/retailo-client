import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UtilService} from '../util/util.service';
import {ROOT_URL} from 'src/assets/keys';
import {
  CreateProductModel,
  ProductListModel,
  ProductModel,
  UpdateProductModel,
} from './product.model';
import {Router} from '@angular/router';
import {AppState} from 'src/app/state/app.state';
import {Store} from "@ngrx/store";
import {addProductToCart} from "../../state/shop/shop.action";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private util: UtilService,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  addNewProduct(body: CreateProductModel) {
    return this.http.post<ProductModel>(
      `${ROOT_URL}/v1/products`,
      body,
      this.util.httpOptionsWithAuthorization
    );
  }

  updateExistingProduct(productId: number, body: UpdateProductModel) {
    return this.http.put<ProductModel>(
      `${ROOT_URL}/v1/products/${productId}`,
      body,
      this.util.httpOptionsWithAuthorization
    );
  }

  getAllProductsForCategory(categoryId: number) {
    return this.http.get<ProductListModel>(
      `${ROOT_URL}/v1/products/category/${categoryId}`,
      this.util.httpOptionsWithAuthorization
    );
  }

  searchForProduct(productName: string) {
    let queryParams = new HttpParams().append('productName', productName);
    return this.http.get<ProductListModel>(`${ROOT_URL}/v1/products/product`, {
      params: queryParams,
      headers: this.util.httpOptionsWithAuthorization.headers,
    });
  }

  getAllProductsForUser(userId: number) {
    return this.http.get<ProductListModel>(
      `${ROOT_URL}/v1/products/user/${userId}`,
      this.util.httpOptionsWithAuthorization
    );
  }

  getSpecificProductsForSpecificUser(userId: string, productId: string) {
    return this.http.get<ProductListModel>(
      `${ROOT_URL}/v1/products/${userId}/${productId}`,
      this.util.httpOptionsWithAuthorization
    );
  }

  getAllProductsPaginated(page: number, size: number) {
    let queryParams = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('sort', 'name');
    return this.http.get<any>(`${ROOT_URL}/v1/products`, {
      params: queryParams,
      headers: this.util.httpOptions.headers,
    });
  }

  addProductToCart(product: ProductModel) {
    const user = this.util.getUserDetails();
    if (user === undefined) {
      this.util.openSnackBar('Kindly login to perform this operation.');
      this.router.navigate(['/authenticate']);
      return;
    }
    this.store.dispatch(addProductToCart(product))
  }
}
