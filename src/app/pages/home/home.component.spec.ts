/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CartService } from 'src/app/core/services/cart.service';
import { ItemsComponent } from './items/items.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: CartService;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, ItemsComponent ],
      providers: [ CartService ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CartService);

    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the cart variable', () => {
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should populate the cart', () => {
    let products = service.getProducts();
    component.addProduct(products[0]);
    expect(component.cart.length).toBe(1);
  })


});
