import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/shared/interfaces/product';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let service: CartService;
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [ CartService ],
      imports: [ RouterTestingModule, FormsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    service = TestBed.inject(CartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should add a item to the cart', () => {
    let product: Product = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, quantity: 1, type: 'acords'};
    component.addItem(product);
    expect(component.cart[0]).toBe(product);
  });

  it('Should remove a item quantity from a product in the cart', () => {
    let product: Product = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, quantity: 2, type: 'acords'};
    component.addItem(product);
    fixture.detectChanges();
    component.removeItem(product);
    fixture.detectChanges();
    expect(component.cart[0].quantity).toBe(2);
  });
});
