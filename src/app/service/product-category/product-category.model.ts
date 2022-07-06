export interface ProductCategoryModel {
  id: number;
  name: string;
}


export interface ProductCategoryRequestBody {
  name: string;
}

export interface AllProductCategoryModel {
  categories: ProductCategoryModel[];
}
