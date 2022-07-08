import {ProductCategoryModel} from "../product-category/product-category.model";

export interface CheckoutTransactionResponse {
  id:number;
  amount: number;
  date: any;
}

export interface CheckoutTransactionRequestBody {
  userId: number;
  products: CheckoutProductRequestBody[]
}

export interface CheckoutProductRequestBody {
  productId: number;
  price: number;
  quantity: number
}

export interface CheckoutHistory {
  history: CheckoutHistoryTransaction[]
}
export interface CheckoutHistoryTransaction {
  id: number;
  date:any;
  amount:number;
  products:CheckoutProduct[]
}
export interface CheckoutProduct {
  id:number;
  name:number;
  price:number;
  quantity:number;
  imageUrl:string;
  category: ProductCategoryModel
}
