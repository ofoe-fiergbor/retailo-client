import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductDialogComponent } from 'src/app/component/product-dialog/product-dialog.component';
import { ProductCategoryService } from 'src/app/service/product-category/product-category.service';
import { ProductModel } from 'src/app/service/product/product.model';
import { ProductService } from 'src/app/service/product/product.service';
import { UserModel } from 'src/app/service/user/user.model';
import { UtilService } from 'src/app/service/util/util.service';
import { AppState } from 'src/app/state/app.state';
import { persistProductCategories } from 'src/app/state/category/category.action';
import { persistProducts } from 'src/app/state/merchant-dashboard/merchant-dashboard.action';
import { getProducts } from 'src/app/state/merchant-dashboard/merchant-dashboard.selector';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css'],
})
export class MerchantDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'status'];
  dataSource: ProductModel[] = [];
  user: UserModel;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private util: UtilService,
    private store: Store<AppState>,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService
  ) {
    this.user = this.util.getUserDetails()!;
  }

  ngOnInit(): void {
    this.productCategoryService.fetchAllCategories().subscribe(
      (data) => this.store.dispatch(persistProductCategories(data)),
      (error) => console.log(error)
    );
    this.productService.getAllProductsForUser(this.user.id).subscribe(
      (data) => {
        // this.dataSource = data.products;
        this.store.dispatch(persistProducts(data));
        this.store
          .select(getProducts)
          .subscribe((data) => (this.dataSource = data));
      },
      (error) => this.util.openSnackBar('Something went wrong!')
    );
  }

  onRowClicked(row: ProductModel) {
    this.openDialog(row);
  }

  navigateToNewProduct() {
    this.router.navigate(['products/add']);
  }

  openDialog(selectedProduct: ProductModel) {
    let dialogref = this.dialog.open(ProductDialogComponent, {
      data: { product: selectedProduct, userId: this.user.id },
    });

    dialogref
      .afterClosed()
      .subscribe((res) =>
        this.store
          .select(getProducts)
          .subscribe((data) => (this.dataSource = data))
      );
  }
}
