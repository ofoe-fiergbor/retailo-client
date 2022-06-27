import { TestBed } from '@angular/core/testing';

import { MerchantGuard } from './merchant.guard';

describe('MerchantGuard', () => {
  let guard: MerchantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MerchantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
