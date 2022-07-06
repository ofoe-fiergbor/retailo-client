import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MerchantDashboardState } from './merchant-dashboard.reducer';

export const merchantDashboardSelector = (state: AppState) =>
  state.merchantDashboard;

export const getProducts = createSelector(
  merchantDashboardSelector,
  (state: MerchantDashboardState) => state.products
);
