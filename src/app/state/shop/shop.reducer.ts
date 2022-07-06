import {createReducer, on} from '@ngrx/store';
import * as ShopActions from './shop.action';
import {ProductModel} from 'src/app/service/product/product.model';

export interface ShopState {
  products: ProductModel[];
  cart: ProductModel[]

}

export const initialState: ShopState = {
  products: [],
  cart: []
};

export const shopReducer = createReducer(
  initialState,

  on(ShopActions.persistProducts, (state, payload) => ({
    ...state,
    products: payload.products,
  })),

  on(ShopActions.addProductToCart, (state, payload) => {
    let productListCopy = [...state.cart].map(p => JSON.parse(JSON.stringify(p)))
    return {
      ...state,
      cart: uniqueProducts(productListCopy, payload)
    }
  }),

  on(ShopActions.removeProductFromCart, (state, payload) => ({
    ...state,
    cart: [...state.cart].filter(product => product.id != payload.id)
  })),

  on(ShopActions.clearCart, (state) => ({
    ...state,
    cart: []
  })),


  on(ShopActions.updateProductQuantity, (state, payload) => ({
    ...state,
    cart: converter(payload, deepCopy(state.cart))
  })),

  on(ShopActions.clearShopState, () => ({
    products: [],
    cart: []
  })),
);

const converter = (input: ProductModel, products: ProductModel[]) => {
  return products.map(product => {
    if (product.id === input.id) {
      product.quantity = input.quantity
    }
    return product
  })
}

const uniqueProducts = (products: ProductModel[], payload: ProductModel): ProductModel[] => {
  let foundProduct = products.find(product => product.id === payload.id)
  if (foundProduct) {
    return products.map(product => {
      if (product.id === foundProduct?.id) {
        product.quantity = payload.quantity
      }
      return product
    })
  }
  return [...products, payload]
}


// const uniqueProducts = (products: ProductModel[]): ProductModel[] => {
//   // JSON.parse(JSON.stringify(product))
//
//   const uniqueIds = new Set();
//   return products.filter(element => {
//     const isDuplicate = uniqueIds.has(element.id);
//     uniqueIds.add(element.id);
//     return !isDuplicate;
//   })
// }


const deepCopy = (products: ProductModel[]): ProductModel[] => {
  return products.map((product) => JSON.parse(JSON.stringify(product)))
}


