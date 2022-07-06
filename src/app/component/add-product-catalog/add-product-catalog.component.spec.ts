import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductCatalogComponent } from './add-product-catalog.component';

describe('AddProductCatalogComponent', () => {
  let component: AddProductCatalogComponent;
  let fixture: ComponentFixture<AddProductCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
