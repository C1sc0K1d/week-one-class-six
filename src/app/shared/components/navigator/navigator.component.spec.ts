import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/core/services/cart.service';
import { LoginService } from 'src/app/core/services/login.service';
import { NavigatorComponent } from './navigator.component';

describe('NavigatorComponent', () => {
  let component: NavigatorComponent;
  let fixture: ComponentFixture<NavigatorComponent>;
  let cartService: CartService;
  let loginService: LoginService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule],
    providers: [CartService, LoginService],
    declarations: [NavigatorComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatorComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the name value', () => {
    component.ngOnInit();
    loginService.sendUserName.next('test user');
    expect(component.name).toBe('Test user');
  });

  it('should toggle the value of seeDropdown', () => {
    component.showDropdown();
    expect(component.seeDropdown).toBeTrue();
    component.showDropdown();
    expect(component.seeDropdown).toBeFalse();
  });

  it('should filter items by type', () => {
    spyOn(cartService, 'setFilter');
    component.filterType('Wind');
    expect(cartService.setFilter).toHaveBeenCalledWith('Wind');
  });

  it('should emit an event to show the modal', () => {
    spyOn(component.callModalEvent, 'emit');
    component.callModal();
    expect(component.callModalEvent.emit).toHaveBeenCalled();
    });
});