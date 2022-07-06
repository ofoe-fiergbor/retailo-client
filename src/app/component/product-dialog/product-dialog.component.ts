import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/service/product/product.model';
import { ProductService } from 'src/app/service/product/product.service';
import { UtilService } from 'src/app/service/util/util.service';
import { AppState } from 'src/app/state/app.state';
import { updateExistingProduct } from 'src/app/state/merchant-dashboard/merchant-dashboard.action';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent implements OnInit {
  isUpdatable = false;
  productStatus = ['HIDDEN', 'AVAILABLE'];
  imagePlaceholder = 'http://fpoimg.com/300x300?text=Placeholder';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { product: ProductModel; userId: number },
    private productService: ProductService,
    private util: UtilService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  formGroup = new FormGroup({
    price: new FormControl(this.data.product.price),
    quantity: new FormControl(this.data.product.quantity),
    description: new FormControl(this.data.product.description),
    status: new FormControl(this.data.product.status),
  });

  updateProduct() {
    let requestBody = this.formGroup.value;
    requestBody.userId = this.data.userId;
    requestBody.categoryId = this.data.product.category.id;
    requestBody.imageUrl = this.imagePlaceholder;
    this.productService
      .updateExistingProduct(this.data.product.id, requestBody)
      .subscribe(
        (data) => {
          // console.log('UPDATE PRODUCT', data);
          this.store.dispatch(updateExistingProduct(data));
          this.util.openSnackBar(`${data.name} has been updated successfully!`);
        },
        (error) => {
          console.log(error);
          this.util.openSnackBar('Something went wrong. Try again!');
        }
      );
  }

  enableProductUpdate() {
    this.isUpdatable = true;
  }
}
