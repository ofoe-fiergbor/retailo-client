import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductCategoryService } from 'src/app/service/product-category/product-category.service';
import { UtilService } from 'src/app/service/util/util.service';
import { AppState } from 'src/app/state/app.state';
import { addNewCategory } from 'src/app/state/category/category.action';

@Component({
  selector: 'app-add-product-catalog',
  templateUrl: './add-product-catalog.component.html',
  styleUrls: ['./add-product-catalog.component.css'],
})
export class AddProductCatalogComponent implements OnInit {
  hide = false;
  constructor(
    private productCategoryService: ProductCategoryService,
    private util: UtilService,
    private store: Store<AppState>
  ) {}

  formGroup = new FormGroup({
    name: new FormControl(''),
  });
  ngOnInit(): void {}

  addNewCategory() {
    this.productCategoryService
      .createNewCategory(this.formGroup.value)
      .subscribe(
        (result) => {
          this.hide = true;
          this.store.dispatch(addNewCategory(result));
          this.util.openSnackBar(`${result.name} has been added.`);
        },
        (error) => this.productCategoryService.errorMessage(error.status)
      );
  }
}
