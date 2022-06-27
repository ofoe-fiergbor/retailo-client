import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './page/shop/shop.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { RegisterComponent } from './component/register/register.component';
import {
  authReducer,
  metaReducerLocalStorage,
} from './state/auth/auth.reducer';
import { HomeHeaderComponent } from './component/home-header/home-header.component';
import { AuthenticationComponent } from './page/authentication/authentication.component';
import { PopularProductComponent } from './component/popular-product/popular-product.component';
import { PopularCollectionComponent } from './component/popular-collection/popular-collection.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileComponent } from './page/profile/profile.component';
import { MerchantRequestComponent } from './page/merchant-request/merchant-request.component';
import { MerchantDashboardComponent } from './page/merchant-dashboard/merchant-dashboard.component';
import { ProfileContentComponent } from './component/profile-content/profile-content.component';
import { ProfileSecurityContentComponent } from './component/profile-security-content/profile-security-content.component';
import { RequestTableComponent } from './component/request-table/request-table.component';
import { ProductCategoryComponent } from './page/product-category/product-category.component';

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
    StoreModule.forRoot(
      {
        auth: authReducer,
      },
      {
        metaReducers: [metaReducerLocalStorage],
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
