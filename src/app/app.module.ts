import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AddNewProductComponent } from './component/add-new-product/add-new-product.component';
import { AddProductCatalogComponent } from './component/add-product-catalog/add-product-catalog.component';
import { HomeHeaderComponent } from './component/home-header/home-header.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PopularCollectionComponent } from './component/popular-collection/popular-collection.component';
import { PopularProductComponent } from './component/popular-product/popular-product.component';
import { ProductCategoryTableComponent } from './component/product-category-table/product-category-table.component';
import { ProductDialogComponent } from './component/product-dialog/product-dialog.component';
import { ProfileContentComponent } from './component/profile-content/profile-content.component';
import { ProfileSecurityContentComponent } from './component/profile-security-content/profile-security-content.component';
import { RegisterComponent } from './component/register/register.component';
import { RequestTableComponent } from './component/request-table/request-table.component';
import { ShopProductCardComponent } from './component/shop-product-card/shop-product-card.component';
import { AuthenticationComponent } from './page/authentication/authentication.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { MerchantDashboardComponent } from './page/merchant-dashboard/merchant-dashboard.component';
import { MerchantRequestComponent } from './page/merchant-request/merchant-request.component';
import { ProductCategoryComponent } from './page/product-category/product-category.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ShopProductDetailsComponent } from './page/shop-product-details/shop-product-details.component';
import { ShopComponent } from './page/shop/shop.component';
import {
  authReducer,
  metaReducerLocalStorage
} from './state/auth/auth.reducer';
import { productCategoryReducer } from './state/category/category.reducer';
import { merchantDashboardReducer } from './state/merchant-dashboard/merchant-dashboard.reducer';
import { shopReducer } from './state/shop/shop.reducer';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';
import {MatButtonModule} from "@angular/material/button";
import { CheckoutHistoryComponent } from './page/checkout-history/checkout-history.component';
import { HistoryDialogComponent } from './component/history-dialog/history-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    HomeHeaderComponent,
    ShopComponent,
    PopularCollectionComponent,
    PopularProductComponent,
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    MerchantRequestComponent,
    MerchantDashboardComponent,
    ProfileContentComponent,
    ProfileSecurityContentComponent,
    RequestTableComponent,
    ProductCategoryComponent,
    ProductCategoryTableComponent,
    AddProductCatalogComponent,
    AddNewProductComponent,
    ProductDialogComponent,
    ShopProductCardComponent,
    ShopProductDetailsComponent,
    ShoppingCartComponent,
    CheckoutHistoryComponent,
    HistoryDialogComponent,
  ],
  imports: [
    MatInputModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatListModule,
    MatBadgeModule,
    MatPaginatorModule,
    StoreModule.forRoot(
      {
        auth: authReducer,
        shop: shopReducer,
        categories: productCategoryReducer,
        merchantDashboard: merchantDashboardReducer,
      },
      {
        metaReducers: [metaReducerLocalStorage],
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MatButtonModule,
  ],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'GHS' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
