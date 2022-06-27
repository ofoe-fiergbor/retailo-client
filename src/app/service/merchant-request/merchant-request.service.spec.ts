import { TestBed } from '@angular/core/testing';

import { MerchantRequestService } from './merchant-request.service';

describe('MerchantRequestService', () => {
  let service: MerchantRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
