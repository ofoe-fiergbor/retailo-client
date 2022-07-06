import {AuthState} from "./auth/auth.reducer";
import { ProductCategoryState } from "./category/category.reducer";
import { MerchantDashboardState } from "./merchant-dashboard/merchant-dashboard.reducer";
import { ShopState } from "./shop/shop.reducer";

export interface AppState {
  auth: AuthState;
  categories: ProductCategoryState,
  merchantDashboard: MerchantDashboardState,
  shop:ShopState
}

