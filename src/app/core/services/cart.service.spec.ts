import { TestBed } from '@angular/core/testing';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let products: Product[] = [
    {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, quantity: 1, type: 'acords'},
    {id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, quantity: 1, type: 'wind'},
    {id: 3, name: 'Violin', image: 'assets/imgs/violin.jpg', price: 121.00, quantity: 1, type: 'acords'}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [ CartService ]
    }).compileComponents();

    service = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should return the products list', () => {
    service.setProducts(products)
    expect(service.getProducts()).toEqual(products);
  });

  it('Should calculate the price of the products on the cart', () => {
    let product_1 = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, quantity: 1, type: 'acords'};
    let product_2 = {id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, quantity: 1, type: 'wind'};
    let product_3 = {id: 3, name: 'Violin', image: 'assets/imgs/violin.jpg', price: 121.00, quantity: 1, type: 'acords'};
    service.addProduct(product_1);
    service.addProduct(product_2);
    service.addProduct(product_3);
    service.calculateDiscount('10OFF');
    expect(service.calculatePrice(service.getCart())).toEqual([270, 300]);
  });
});