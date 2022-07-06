import {createAction, props} from '@ngrx/store';
import {
  ProductListModel, ProductModel
} from 'src/app/service/product/product.model';

export const persistProducts = createAction(
  '[SHOP PAGE] Persist products for user',
  props<ProductListModel>()
);

export const clearShopState = createAction('[SHOP PAGE] Clear products');

export const addProductToCart = createAction(
  '[SHOP PAGE] Add product to cart',
  props<ProductModel>());

export const updateProductQuantity = createAction(
  '[SHOP PAGE] Update product in cart',
  props<ProductModel>());

export const removeProductFromCart = createAction(
  '[SHOP PAGE] Remove product from cart',
  props<ProductModel>());

export const clearCart = createAction('[SHOP PAGE] Clear cart')
