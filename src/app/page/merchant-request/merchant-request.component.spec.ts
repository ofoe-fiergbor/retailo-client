import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantRequestComponent } from './merchant-request.component';

describe('MerchantRequestComponent', () => {
  let component: MerchantRequestComponent;
  let fixture: ComponentFixture<MerchantRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
