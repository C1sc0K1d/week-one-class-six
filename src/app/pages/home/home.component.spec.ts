import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/core/services/cart.service';
import { InstrumentService } from 'src/app/core/services/instrument.service';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cartService: CartService;
  let instrumentService: InstrumentService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [HomeComponent],
      providers: [CartService, InstrumentService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    instrumentService = TestBed.inject(InstrumentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all instruments', () => {
    const products: Product[] = [
      {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'},
      {id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, type: 'wind'}
    ];

    spyOn(instrumentService, 'getAllInstruments').and.returnValue(of({ instruments: products }));
    component.ngOnInit();

    expect(component.filteredProducts).toEqual(products);
    expect(component.products).toEqual(products);
    expect(cartService.getProducts()).toEqual(products);
  });

  it('should add a product to the cart', () => {
    const product: Product = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'};

    spyOn(cartService, 'addProduct').and.returnValue([product]);
    component.addProduct(product);

    expect(component.cart).toEqual([product]);
    expect(cartService.addProduct).toHaveBeenCalledWith(product);
  });

  it('should filter products by value', () => {
    const products: Product[] = [
      {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'},
      {id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, type: 'wind'},
      {id: 3, name: 'Violin', image: 'assets/imgs/violin.jpg', price: 121.00, type: 'acords'}
    ];

    component.products = products;
    component.filterByValue(products, 'Sax');

    expect(component.filteredProducts).toEqual([{id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, type: 'wind'}]);
  });
});