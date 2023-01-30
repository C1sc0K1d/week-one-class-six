import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/core/services/cart.service';

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let service: CartService;
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ],
      imports: [ RouterTestingModule ],
      providers: [ CartService ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmationComponent);
    service = TestBed.inject(CartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct cart from the CartService', () => {
    let fakeCart = [{ id: 1, name: 'product 1', price: 100 }];
    spyOn(service, 'getCart').and.returnValue(fakeCart);
    component.ngOnInit();
    expect(component.cart).toEqual(fakeCart);
  });

  it('should set the correct total from the CartService', () => {
    spyOn(service, 'calculatePrice').and.returnValue([100, 80]);
    component.ngOnInit();
    expect(component.total).toEqual(100);
  });

  it('should set the correct haveDiscount from the CartService', () => {
    spyOn(service, 'getHaveDiscount').and.returnValue(true);
    component.ngOnInit();
    expect(component.haveDiscount).toEqual(true);
  });

});
