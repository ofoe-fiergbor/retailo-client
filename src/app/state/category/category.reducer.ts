import { createReducer, on } from '@ngrx/store';
import { ProductCategoryModel } from 'src/app/service/product-category/product-category.model';
import * as ProductCategoryActions from './category.action';

export interface ProductCategoryState {
  categories: ProductCategoryModel[];
}

export const initialState: ProductCategoryState = {
  categories: [],
};

export const productCategoryReducer = createReducer(
  initialState,
  on(ProductCategoryActions.persistProductCategories, (state, payload) => ({
    ...state,
    categories: payload.categories,
  })),
  on(ProductCategoryActions.addNewCategory, (state, payload) => ({
    ...state,
    categories: [...state.categories, payload],
  })),
  on(ProductCategoryActions.updateProductCategory, (state, payload) => ({
    ...state,
    categories: [...state.categories].map((category) => {
      if (category.id == payload.id) {
        category.name = payload.name;
      }
      return category;
    }),
  })),
  on(ProductCategoryActions.clearCategoryState, () => ({
    categories: [],
  }))
);
