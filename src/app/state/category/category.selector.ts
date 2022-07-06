import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductCategoryState } from './category.reducer';

export const productSelectorState = (state: AppState) => state.categories;

export const getCategories = createSelector(
  productSelectorState,
  (state: ProductCategoryState) => state.categories
);
