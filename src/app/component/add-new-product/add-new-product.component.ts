import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductCategoryModel } from 'src/app/service/product-category/product-category.model';
import { ProductService } from 'src/app/service/product/product.service';
import { UserModel } from 'src/app/service/user/user.model';
import { UtilService } from 'src/app/service/util/util.service';
import { AppState } from 'src/app/state/app.state';
import { getCategories } from 'src/app/state/category/category.selector';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  productCategories: ProductCategoryModel[] = [];
  productStatus = ['HIDDEN', 'AVAILABLE'];
  imagePlaceholder = 'http://fpoimg.com/300x300?text=Placeholder';
  user?: UserModel;
  category: ProductCategoryModel[] = [];
  constructor(
    private util: UtilService,
    private store: Store<AppState>,
    private productService: ProductService
  ) {}

  formGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(),
    quantity: new FormControl(),
    status: new FormControl(''),
    categoryId: new FormControl(),
  });

  ngOnInit(): void {
    this.store
      .select(getCategories)
      .subscribe((data) => (this.productCategories = data));
    this.user = this.util.getUserDetails();
    this.category = this.util.getProductCategories();
  }

  handleFormSubmit() {
    let requestBody = this.formGroup.value;
    requestBody.imageUrl = this.imagePlaceholder;
    requestBody.userId = this.user?.id;
    // console.log('ADD NEW PRODUCT REQUEST: ', requestBody);
    this.productService.addNewProduct(requestBody).subscribe(
      (response) => {
        // console.log('ADD NEW PRODUCT RESPONSE: ', response);
        this.util.openSnackBar(`${response.name} has been added successfully.`);
        this.formGroup.reset();
        this.goBack();
      },
      (error) =>
        this.util.openSnackBar('Something went wrong. Try again later!')
    );
  }

  goBack() {
    this.formGroup.reset();
    history.back();
  }
}
