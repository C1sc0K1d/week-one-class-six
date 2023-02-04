import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SigninComponent } from './signin.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'src/app/core/helpers/message.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ViaCepService } from 'src/app/core/services/via-cep.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach((() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        SigninComponent
      ],
      providers: [
        FormBuilder,
        MessageService,
        LoginService,
        ViaCepService,
        NgxUiLoaderService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid if inputs are empty', () => {
    component.userForm.controls['userName'].setValue('');
    component.userForm.controls['password'].setValue('');
    component.userForm.controls['email'].setValue('');
    component.userForm.controls['phone'].setValue('');
    component.userForm.controls['postalCode'].setValue('');
    component.userForm.controls['address'].setValue('');
    component.userForm.controls['neighborhood'].setValue('');
    component.userForm.controls['city'].setValue('');
    component.userForm.controls['state'].setValue('');
    expect(component.userForm.valid).toBeFalsy();
  });
});
