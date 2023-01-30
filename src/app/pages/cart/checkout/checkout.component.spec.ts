import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { Router } from '@angular/router';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select payment method', () => {
    const paymentMethod = 'Credit Card';
    component.selectMethod(paymentMethod);
    expect(component.paymentMethod).toBe(paymentMethod);
  });

  it('should navigate to confirmation page', () => {
    component.goToConfirmation();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cart/confirmation']);
  });
});