import { createReducer, on } from '@ngrx/store';
import { ProductModel } from 'src/app/service/product/product.model';
import * as MerchantDashboardActions from './merchant-dashboard.action';

export interface MerchantDashboardState {
  products: ProductModel[];
}

export const initialState: MerchantDashboardState = {
  products: [],
};

export const merchantDashboardReducer = createReducer(
  initialState,
  on(MerchantDashboardActions.persistProducts, (state, payload) => ({
    ...state,
    products: payload.products,
  })),
  on(MerchantDashboardActions.addNewProduct, (state, payload) => ({
    ...state,
    products: [...state.products, payload],
  })),
  on(MerchantDashboardActions.updateExistingProduct, (state, payload) => {
    let products = state.products.map((product) =>
      JSON.parse(JSON.stringify(product))
    );
    return {
      ...state,
      products: updateProduct(products, payload),
    };
  }),
  on(MerchantDashboardActions.clearProductState, () => initialState)
);

const updateProduct = (products: ProductModel[], newChange: ProductModel) => {
  return products.map((product) => {
    if (product.id === newChange.id) {
      Object.assign(product, newChange)
    }
    return product;
  });
};
