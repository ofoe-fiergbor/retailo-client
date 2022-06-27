export interface MerchantRequestModel {
  id: number;
  userId: number;
  status: 'PENDING' | 'GRANTED' | 'DENIED' | 'REVOKED';
  comment: string;
  firstName: string;
  lastName: string;
  createDate: any;
  lastUpdated: any;
  pictureUrl: string;
  email: string;
  phone: string;
  address: string;
}


export interface AllMerchantRequests {
  requests: MerchantRequestModel[];
}

export interface MerchantRequest {
  userId: number;
}

export interface UpdateMerchantRequest {
  status: 'PENDING' | 'GRANTED' | 'DENIED' | 'REVOKED';
  comment: string;
}
