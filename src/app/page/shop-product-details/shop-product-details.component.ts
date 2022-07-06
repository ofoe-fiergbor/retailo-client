import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {ProductModel} from 'src/app/service/product/product.model';
import {ProductService} from 'src/app/service/product/product.service';
import {AppState} from 'src/app/state/app.state';
import {getProducts} from 'src/app/state/shop/shop.selector';
import {FormControl, FormGroup} from "@angular/forms";
import {UtilService} from "../../service/util/util.service";

@Component({
  selector: 'app-shop-product-details',
  templateUrl: './shop-product-details.component.html',
  styleUrls: ['./shop-product-details.component.css'],
})
export class ShopProductDetailsComponent implements OnInit {
  product!: ProductModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private productService: ProductService,
    private util:UtilService
  ) {
  }

  formGroup = new FormGroup({
    quantity: new FormControl(1)
  })

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const productId = Number(routeParams.get('productId'));
    this.store
      .select(getProducts)
      .subscribe(
        (products) =>
          (this.product = products.find((product) => product.id === productId)!)
      );

    // this.store
    //   .select(getProducts)
    //   .subscribe(
    //     (products) =>
    //       (this.product = products.find((product) => product.id === productId)!)
    //   );
  }

  addToCart() {
    let productCopy = this.util.deepCopyObject(this.product)
    productCopy.quantity = this.formGroup.value.quantity
    this.productService.addProductToCart(productCopy);
  }
}
