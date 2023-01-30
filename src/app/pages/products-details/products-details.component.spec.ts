import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsDetailsComponent } from './products-details.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ProductsDetailsComponent', () => {
  let component: ProductsDetailsComponent;
  let fixture: ComponentFixture<ProductsDetailsComponent>;
  let cartService: CartService;
  let router: Router;
  let route: ActivatedRoute;
  let product: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [ ProductsDetailsComponent ],
    providers: [ CartService, { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }, { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } } ],
    imports: [ FormsModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDetailsComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    product = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'};

    spyOn(cartService, 'getProduct').and.returnValue(product);
    spyOn(cartService, 'findIndex').and.returnValue(-1);
    spyOn(cartService, 'addProduct');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProduct from the CartService on ngOnInit', () => {
    fixture.detectChanges();
    expect(cartService.getProduct).toHaveBeenCalledWith(1);
  });

  it('should call addProduct from the CartService on addProduct', () => {
    fixture.detectChanges();
    component.addProduct(product);
    expect(cartService.addProduct).toHaveBeenCalledWith({id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords', quantity: 1 });
  });

  it('should call navigate from the Router on goToHome', () => {
    fixture.detectChanges();
    component.goToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});