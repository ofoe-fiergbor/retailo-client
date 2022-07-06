import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductCategoryModel } from 'src/app/service/product-category/product-category.model';
import { ProductCategoryService } from 'src/app/service/product-category/product-category.service';
import { UtilService } from 'src/app/service/util/util.service';
import { AppState } from 'src/app/state/app.state';
import { persistProductCategories } from 'src/app/state/category/category.action';

@Component({
  selector: 'app-product-category-table',
  templateUrl: './product-category-table.component.html',
  styleUrls: ['./product-category-table.component.css'],
})
export class ProductCategoryTableComponent implements OnInit {
  // editCategory = false;
  displayedColumns: string[] = ['position', 'name'];
  dataSource: ProductCategoryModel[] = [];
  constructor(
    private util: UtilService,
    private productCategoryService: ProductCategoryService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.productCategoryService.fetchAllCategories().subscribe(
      (data) => {
        this.dataSource = data.categories;
        this.store.dispatch(persistProductCategories(data));
      },
      (error) => this.productCategoryService.errorMessage(error.status)
    );
  }

  onRowClicked(row: ProductCategoryModel) {
    console.log('clicked', row);
    // this.editCategory = true;
  }
}
