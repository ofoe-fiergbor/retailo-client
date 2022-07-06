import { createAction, props } from '@ngrx/store';
import {
  ProductListModel,
  ProductModel,
} from 'src/app/service/product/product.model';

export const persistProducts = createAction(
  '[PRODUCT PAGE] Persist all products for merchant',
  props<ProductListModel>()
);

export const clearProductState = createAction('[CATEGORY PAGE] Clear products');

export const addNewProduct = createAction(
  '[CATEGORY PAGE] Add new product',
  props<ProductModel>()
);

export const updateExistingProduct = createAction(
  '[CATEGORY PAGE] Update existing product',
  props<ProductModel>()
);
