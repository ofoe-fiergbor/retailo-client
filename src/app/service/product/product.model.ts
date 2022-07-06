import { ProductCategoryModel } from '../product-category/product-category.model';

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  description: string;
  status: 'HIDDEN' | 'AVAILABLE';
  category: ProductCategoryModel;
}

export interface CreateProductModel {
  userId: number;
  categoryId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  description: string;
  status: 'HIDDEN' | 'AVAILABLE';
}

// export interface CartModel {
//   products: ProductModel[]
//   totalCost: number
// }

export interface UpdateProductModel {
  userId: number;
  categoryId: number;
  price: number;
  imageUrl: string;
  quantity: number;
  description: string;
  status: 'HIDDEN' | 'AVAILABLE';
}


export interface ProductListModel {
  products: ProductModel[];
}
