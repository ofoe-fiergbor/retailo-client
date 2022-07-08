import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutHistoryComponent } from './checkout-history.component';

describe('CheckoutHistoryComponent', () => {
  let component: CheckoutHistoryComponent;
  let fixture: ComponentFixture<CheckoutHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
