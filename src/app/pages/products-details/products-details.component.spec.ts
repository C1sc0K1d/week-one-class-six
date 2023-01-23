import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

import { ProductsDetailsComponent } from './products-details.component';

describe('ProductsDetailsComponent', () => {
  let service: CartService;
  let component: ProductsDetailsComponent;
  let fixture: ComponentFixture<ProductsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDetailsComponent ],
      providers: [ CartService, {provide: ActivatedRoute, useValue: ActivatedRoute} ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
