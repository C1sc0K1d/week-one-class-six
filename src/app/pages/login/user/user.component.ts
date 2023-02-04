import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/core/helpers/message.service';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  user: User = {
    userName: localStorage.getItem('userName') || '',
    password: localStorage.getItem('password') || ''
  };

  constructor(private loginService: LoginService, private fb: FormBuilder, private messageService: MessageService, private ngxService: NgxUiLoaderService) {
    this.userForm  = this.fb.group(
      {
        userName: [{value: '', disabled: true}, [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.minLength(7)]],
        phone: ['', [Validators.required, Validators.minLength(11)]],
        address: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required]],
        news: [false]
      }, { validators: this.passwordComparatorValidator() }
    );
   }

  ngOnInit(): void {
    this.ngxService.start();
    this.user.password = localStorage.getItem('password') || '';
    this.user.userName = localStorage.getItem('userName') || '';
    this.loginService.login(this.user).subscribe(response => {
      this.user = response.user;  
      this.userForm.controls['userName'].setValue(response.user.userName);
      this.userForm.controls['password'].setValue(response.user.password);
      this.userForm.controls['email'].setValue(response.user.email);
      this.userForm.controls['phone'].setValue(response.user.phone);
      this.userForm.controls['address'].setValue(response.user.address);
      this.userForm.controls['repeatPassword'].setValue(response.user.password);
      this.ngxService.stop();
    });
  }

  passwordComparatorValidator() : ValidatorFn {
    return  (control: AbstractControl): ValidationErrors | null => { 
      let value =  control.get('repeatPassword')?.value === control.get('password')?.value;
      return !value ? { notMatch: true } : null;
    };
  }

  restoreInfos() : void {
    this.userForm.controls['userName'].setValue(this.user.userName);
    this.userForm.controls['password'].setValue(this.user.password);
    this.userForm.controls['email'].setValue(this.user.email);
    this.userForm.controls['phone'].setValue(this.user.phone);
    this.userForm.controls['address'].setValue(this.user.address);
    this.userForm.controls['repeatPassword'].setValue(this.user.password); 
  }

  updateUser() : void {
    this.ngxService.start();
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;
    this.user.phone = this.userForm.value.phone;
    this.user.address = this.userForm.value.address;
    this.loginService.updateUser(this.user).subscribe(response => {
      this.ngxService.stop();
      this.messageService.add(`${response.user.userName}, seu usuário foi alterado com sucesso`);
    });
  }
}
