import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/core/services/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let service: LoginService;
  let router: Router;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ LoginService ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('Should set the user to Admin', () => {
    expect(service.getUser()).toBe('Login');
    component.logIn('admin');
    expect(service.getUser()).toBe('admin');
    expect(router.navigate).toHaveBeenCalledWith(['/login/admin'])

  });

  it('Should set the user to Fulano', () => {
    expect(service.getUser()).toBe('Login');
    component.logIn('fulano');
    expect(service.getUser()).toBe('fulano');
    expect(router.navigate).toHaveBeenCalledWith(['/login/user'])
  });*/
});
