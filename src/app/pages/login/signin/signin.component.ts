import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/core/helpers/message.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ViaCepService } from 'src/app/core/services/via-cep.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: User = {
    userName: '',
    password: ''
  };

  userForm: FormGroup;
  cepOk: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private loginService: LoginService, private router: Router, private cepService: ViaCepService, private ngxService: NgxUiLoaderService) {
    this.userForm  = this.fb.group(
      {
      userName: [this.user.userName, [Validators.required, Validators.minLength(4)]],
      password: [this.user.password, [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.minLength(7)]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      postalCode: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      number: [''],
      complement: [''],
      neighborhood: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(1)]],
      repeatPassword: ['', [Validators.required]],
      policies: [false, [Validators.requiredTrue]],
      data: [false, [Validators.requiredTrue]]
    }, { validators: Validators.compose(
        [
          this.passwordComparatorValidator(),
          this.getCep()
        ]
      )
    });
   }

  ngOnInit(): void {}

  passwordComparatorValidator() : ValidatorFn {
    return  (control: AbstractControl): ValidationErrors | null => { 
      let value =  control.get('repeatPassword')?.value === control.get('password')?.value;
      return !value ? { notMatch: true } : null;
    };
  }

  newUser() : void {
    this.ngxService.start();
    this.user.password = this.userForm.value.password;
    this.user.userName = this.userForm.value.userName.toLowerCase();
    this.user.email = this.userForm.value.email.toLowerCase();;
    this.user.phone = this.userForm.value.phone;
    if (this.userForm.value.complement) {
      this.user.address = this.userForm.value.address + ' ' + this.userForm.value.number + '; ' + this.userForm.value.complement + ', ' + this.userForm.value.neighborhood + ' - ' + this.userForm.value.city + '/' + this.userForm.value.state;
    } else if (this.userForm.value.number) {
      this.user.address = this.userForm.value.address + ' ' + this.userForm.value.number + ', ' + this.userForm.value.neighborhood + ' - ' + this.userForm.value.city + '/' + this.userForm.value.state;
    } else {
      this.user.address = this.userForm.value.address + ', ' + this.userForm.value.neighborhood + ' - ' + this.userForm.value.city + '/' + this.userForm.value.state;
    }
    this.loginService.createUser(this.user).subscribe(response => {
      this.router.navigate(['/login']);
      this.ngxService.stop();
      this.messageService.add('Welcome ' + response.user.userName[0].toUpperCase() + response.user.userName.substring(1).
      toLowerCase() +' to the louder site of the world!! Get some instruments and make noise yourself too!!');
      this.userForm.reset();
    }); 
  }

  getCep() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.get('postalCode')?.value.length === 8) {
        if (!this.cepOk) {
          this.ngxService.start();
          this.cepService.getCep(control.get('postalCode')?.value).subscribe(data => {          
            this.userForm.controls['address'].setValue(data.logradouro);
            this.userForm.controls['neighborhood'].setValue(data.bairro);
            this.userForm.controls['city'].setValue(data.localidade);
            this.userForm.controls['state'].setValue(data.uf);
            if (!data.logradouro) {
              this.ngxService.stop();
              this.messageService.add("Postal Code Not Found!");
              return { 'postalCodeInvalid' : true };
            }
            this.cepOk = true;
            this.ngxService.stop();
            return null;
          });
        }
        return null;
      }
      this.cepOk = false;
      return { 'postalCodeInvalid' : true };
    }
  }
    

  clearUserForm() : void {
    this.userForm.reset();
  }

}
