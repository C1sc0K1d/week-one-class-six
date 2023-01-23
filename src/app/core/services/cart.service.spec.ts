import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from './cart.service';

describe('ConfirmationComponent', () => {
  let component: CartService;
  let fixture: ComponentFixture<CartService>;
  let products: Product[] = [
    {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'},
    {id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, type: 'wind'},
    {id: 3, name: 'Violin', image: 'assets/imgs/violin.jpg', price: 121.00, type: 'acords'},
    {id: 4, name: 'Trumpet', image: 'assets/imgs/trumpet.jpg', price: 82.90, type: 'wind'},
    {id: 5, name: 'Piano', image: 'assets/imgs/piano.jpg', price: 435.87, type: 'acords'},
    {id: 6, name: 'Flute', image: 'assets/imgs/flute.jpg', price: 32.10, type: 'wind'},
    {id: 7, name: 'Harp', image: 'assets/imgs/harp.jpg', price: 45.00, type: 'acords'},
    {id: 8, name: 'Drums', image: 'assets/imgs/drums.jpg', price: 213.33, type: 'percussion'}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return the products list', () => {
    expect(component.getProducts()).toEqual(products);
  });

  it('Should calculate the price of the products on the cart', () => {
    let product_1 = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, quantity: 1, type: 'acords'};
    let product_2 = {id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, quantity: 1, type: 'wind'};
    let product_3 = {id: 3, name: 'Violin', image: 'assets/imgs/violin.jpg', price: 121.00, quantity: 1, type: 'acords'}
    component.addProduct(product_1);
    component.addProduct(product_2);
    component.addProduct(product_3);
    fixture.detectChanges();
    expect(component.calculatePrice(component.getCart())).toEqual([270, 300]);
  });
});