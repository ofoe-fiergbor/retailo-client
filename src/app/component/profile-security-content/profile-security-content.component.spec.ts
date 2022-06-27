import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSecurityContentComponent } from './profile-security-content.component';

describe('ProfileSecurityContentComponent', () => {
  let component: ProfileSecurityContentComponent;
  let fixture: ComponentFixture<ProfileSecurityContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSecurityContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSecurityContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
