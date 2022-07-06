import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from '../util/util.service';
import {
  AllProductCategoryModel,
  ProductCategoryModel,
  ProductCategoryRequestBody,
} from './product-category.model';
import { ROOT_URL } from 'src/assets/keys';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private http: HttpClient, private util: UtilService) {}

  createNewCategory(body: ProductCategoryRequestBody) {
    return this.http.post<ProductCategoryModel>(
      `${ROOT_URL}/v1/categories`,
      body,
      this.util.httpOptionsWithAuthorization
    );
  }

  fetchAllCategories() {
    return this.http.get<AllProductCategoryModel>(
      `${ROOT_URL}/v1/categories`,
      this.util.httpOptionsWithAuthorization
    );
  }

  fetchCategoryById(id: number) {
    return this.http.get<ProductCategoryModel>(
      `${ROOT_URL}/v1/categories/${id}`,
      this.util.httpOptionsWithAuthorization
    );
  }

  updateCategory(body: ProductCategoryRequestBody, id: number) {
    return this.http.put<ProductCategoryModel>(
      `${ROOT_URL}/v1/categories/${id}`,
      body,
      this.util.httpOptionsWithAuthorization
    );
  }

  errorMessage(status: number) {
    switch (status) {
      case 409:
        this.util.openSnackBar("There's already a category with this name.");
        break;
      default:
        this.util.openSnackBar('Something went wrong. Try again later.');
        break;
    }
  }
}
