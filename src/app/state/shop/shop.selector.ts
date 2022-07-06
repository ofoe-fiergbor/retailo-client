import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ShopState } from './shop.reducer';

export const shopSelector = (state: AppState) =>
  state.shop;

export const getProducts = createSelector(
  shopSelector,
  (state: ShopState) => state.products
);

export const getCart = createSelector(
  shopSelector,
  (state: ShopState) => state.cart
)

