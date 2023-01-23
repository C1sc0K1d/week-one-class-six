/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from '../../interfaces/product';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let service: CartService;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should change the value of modal visibility', () => {
    expect(service.getModalStatus()).toBeFalsy();
    component.callModal();
    expect(service.getModalStatus()).toBeTruthy();
  });

  it('Should change the value of items_qtt when item is add to cart', () => {
    let product: Product = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, quantity: 2, type: 'acords'};
    service.addProduct(product);
    expect(component.items_qtt).toBe(2);
  });
});
