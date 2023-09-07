import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificProductComponent } from './specific-product.component';

describe('SpecificProductComponent', () => {
  let component: SpecificProductComponent;
  let fixture: ComponentFixture<SpecificProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificProductComponent]
    });
    fixture = TestBed.createComponent(SpecificProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
