import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './page/authentication/authentication.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ShopComponent } from './page/shop/shop.component';
import { AuthGuard } from './guard/auth-guard/auth.guard';
import { ProfileComponent } from './page/profile/profile.component';
import { MerchantDashboardComponent } from './page/merchant-dashboard/merchant-dashboard.component';
import { MerchantGuard } from './guard/merchant-guard/merchant.guard';
import { MerchantRequestComponent } from './page/merchant-request/merchant-request.component';
import { AdminGuard } from './guard/admin-guard/admin.guard';
import { ProductCategoryComponent } from './page/product-category/product-category.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'authenticate', component: AuthenticationComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'merchant/dashboard',
    component: MerchantDashboardComponent,
    canActivate: [AuthGuard, MerchantGuard],
  },
  {
    path: 'request/merchant-request',
    component: MerchantRequestComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path:'category/dashboard',
    component: ProductCategoryComponent,
    canActivate:[AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
