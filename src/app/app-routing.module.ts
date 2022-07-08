import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddNewProductComponent} from './component/add-new-product/add-new-product.component';
import {AdminGuard} from './guard/admin-guard/admin.guard';
import {AuthGuard} from './guard/auth-guard/auth.guard';
import {MerchantGuard} from './guard/merchant-guard/merchant.guard';
import {AuthenticationComponent} from './page/authentication/authentication.component';
import {HomePageComponent} from './page/home-page/home-page.component';
import {MerchantDashboardComponent} from './page/merchant-dashboard/merchant-dashboard.component';
import {MerchantRequestComponent} from './page/merchant-request/merchant-request.component';
import {ProductCategoryComponent} from './page/product-category/product-category.component';
import {ProfileComponent} from './page/profile/profile.component';
import {ShopProductDetailsComponent} from './page/shop-product-details/shop-product-details.component';
import {ShopComponent} from './page/shop/shop.component';
import {ShoppingCartComponent} from "./page/shopping-cart/shopping-cart.component";
import {CheckoutHistoryComponent} from "./page/checkout-history/checkout-history.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'authenticate', component: AuthenticationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
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
    path: 'category/dashboard',
    component: ProductCategoryComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'products/add',
    component: AddNewProductComponent,
    canActivate: [AuthGuard, MerchantGuard],
  },
  {
    path: 'shop/shopping-cart',
    component: ShoppingCartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'shop/shopping-cart/history',
    component:CheckoutHistoryComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'shop/:productId',
    component: ShopProductDetailsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
