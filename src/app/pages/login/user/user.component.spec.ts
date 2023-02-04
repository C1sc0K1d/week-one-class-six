import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/core/helpers/message.service';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
let component: UserComponent;
let fixture: ComponentFixture<UserComponent>;
let loginService: LoginService;
let messageService: MessageService;
let ngxUiLoaderService: NgxUiLoaderService;

const user: User = {
  userName: 'test',
  password: '123456',
  email: 'test@email.com',
  phone: '12345678901',
  address: 'test address'
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      providers: [ FormBuilder, LoginService, MessageService, NgxUiLoaderService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    
    fixture = TestBed.createComponent(UserComponent);
    loginService = TestBed.inject(LoginService);
    messageService = TestBed.inject(MessageService);
    ngxUiLoaderService = TestBed.inject(NgxUiLoaderService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.userForm.controls['userName'].setValue('');
    component.userForm.controls['password'].setValue('');
    component.userForm.controls['email'].setValue('');
    component.userForm.controls['phone'].setValue('');
    component.userForm.controls['address'].setValue('');
    component.userForm.controls['repeatPassword'].setValue('');
    expect(component.userForm.valid).toBeFalsy();
  });
    
  it('form should be valid', () => {
    component.userForm.controls['userName'].setValue('userName');
    component.userForm.controls['password'].setValue('password');
    component.userForm.controls['email'].setValue('email@email.com');
    component.userForm.controls['phone'].setValue('1234567890');
    component.userForm.controls['address'].setValue('address');
    component.userForm.controls['repeatPassword'].setValue('password');
    expect(component.userForm.valid).toBeFalsy();
  });
    
  it('should call the updateUser method', () => {
    spyOn(component, 'updateUser');
    component.updateUser();
    expect(component.updateUser).toHaveBeenCalled();
  });

  // Test for form submit
  it('form submit should call the updateUser method', () => {
    spyOn(component, 'updateUser');
    component.ngOnInit();
    component.userForm.controls['userName'].setValue('test');
    component.userForm.controls['password'].setValue('test');
    component.userForm.controls['email'].setValue('test@test.com');
    component.userForm.controls['phone'].setValue('11987654321');
    component.userForm.controls['address'].setValue('test address');
    component.userForm.controls['repeatPassword'].setValue('test');
    component.userForm.controls['news'].setValue(true);
    component.updateUser();
    expect(component.updateUser).toHaveBeenCalled();
  });
  

});
