import { createAction, props } from '@ngrx/store';
import {
  AllProductCategoryModel,
  ProductCategoryModel,
} from 'src/app/service/product-category/product-category.model';

export const persistProductCategories = createAction(
  '[CATEGORY PAGE] Persist Product Categories',
  props<AllProductCategoryModel>()
);

export const clearCategoryState = createAction(
  '[CATEGORY PAGE] Clear Product categories'
);

export const addNewCategory = createAction(
  '[CATEGORY PAGE] Add new category',
  props<ProductCategoryModel>()
);

export const updateProductCategory = createAction(
  '[CATEGORY PAGE] Add new category',
  props<ProductCategoryModel>()
);
