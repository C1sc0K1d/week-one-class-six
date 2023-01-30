import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/core/services/cart.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Product } from 'src/app/shared/interfaces/product';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let cartService: CartService;
    let loginService: LoginService;
    let router: Router;

    beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
    declarations: [ CartComponent ],
    providers: [ CartService, LoginService ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
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
    component.removeItem(product);
    expect(component.cart[0].quantity).toBe(2);
  });

  it('should call cart service to calculate price', () => {
    spyOn(cartService, 'calculatePrice').and.returnValue([0, 0]);
    component.ngOnInit();
    expect(cartService.calculatePrice).toHaveBeenCalled();
  });

  it('should call cart service to delete item', () => {
    const product = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'};
    spyOn(cartService, 'deleteItem').and.returnValue([]);
    component.deleteItem(product);
    expect(cartService.deleteItem).toHaveBeenCalledWith(product);
  });
});
