import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PageEvent} from '@angular/material/paginator';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';

import {AppState} from 'src/app/state/app.state';
import {UtilService} from 'src/app/service/util/util.service';
import {persistProducts} from 'src/app/state/shop/shop.action';
import {ProductModel} from 'src/app/service/product/product.model';
import {ProductService} from 'src/app/service/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: ProductModel[] = [];
  length = 100;
  pageSize = 15;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  searchSubject = new Subject<string | undefined>();
  searchResult: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private util: UtilService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.fetchProducts(0, this.pageSize);
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value !== '') {
          this.productService.searchForProduct(value).subscribe(
            (res) => {
              if (res.products.length === 0) {
                this.util.openSnackBar(
                  `Sorry, couldn't find a product that matched "${value}"`
                );
              }
              this.searchResult = res.products;
              this.store.dispatch(persistProducts(res));
            },
            (err) => console.log(err)
          );
        } else this.searchResult = [];
      });
    this.searchResult.length;
  }

  trackPageEvent(event: PageEvent) {
    this.productService.getAllProductsPaginated(
      event.pageIndex,
      event.pageSize
    );
  }

  fetchProducts(page: number, size: number) {
    this.productService.getAllProductsPaginated(page, size).subscribe(
      (response) => {
        this.pageSize = response.size;
        this.length = response.totalElements;
        this.products = response.content;
        this.store.dispatch(persistProducts({ products: response.content }));
      },
      (error) => this.util.openSnackBar('Something went wrong. Try again!')
    );
  }

  searchProduct(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }
}
