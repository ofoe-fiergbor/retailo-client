import {ProductCategoryModel} from "../product-category/product-category.model";

export interface CheckoutTransactionModel {
  id: number
  amount: number
  createdDate: any
  "products": CheckoutProductModel[]
}

export interface CheckoutProductModel {
  id: number
  name: string,
  price: number
  productId: number
  quantity: number
  category: ProductCategoryModel;
}
