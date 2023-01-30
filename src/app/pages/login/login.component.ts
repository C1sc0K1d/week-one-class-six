import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTokenInterceptor } from 'src/app/core/authentication/auth-token.interceptor';
import { MessageService } from 'src/app/core/helpers/message.service';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    userName: '',
    password: ''
  };

  userForm: FormGroup =  new FormGroup({});

  constructor(public loginService : LoginService, private router: Router, private fb: FormBuilder, private messageService: MessageService, private auth: AuthTokenInterceptor) {}
  

  // FUnctions
  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: [this.user.userName, [Validators.required, Validators.minLength(4)]],
      password: [this.user.password, [Validators.required, Validators.minLength(4)]]
    });
  }

  // Set the user that is logging in
  onSubmit(): void {

    let condition = (this.loginService.getUser().toLowerCase() === this.userForm.value.userName.toLowerCase() || this.loginService.getUser().toLowerCase() !== 'login')

    if (condition) {
      this.messageService.add('You are aready logged in');
      return;
    }

    this.user = this.userForm.value;

    this.loginService.login(this.user).subscribe(response => {
      this.messageService.add('Welcome ' + response.user.userName[0].toUpperCase() + response.user.userName.substring(1).toLowerCase() + '!!');
      this.auth.token = '12434321';
      if (response.user.isAdmin) this.router.navigate(['/login/admin']);
      else this.router.navigate(['/home']);
    });
  }

  // Set the user that is logging out
  logOut(): void {
    let user = this.loginService.getUser();
    if (user.toLowerCase() !== "login") {
    this.messageService.add('Bye  ' + user[0].toUpperCase() + user.substring(1).toLowerCase() + '!!');
    this.loginService.logout();
    this.auth.token = null;
    return;
    }
    this.messageService.add('You are aready logged out');
  }

  goToSignIn(): void {
    this.router.navigate(['/login/signin']);
  }

  goToAdminPage(): void {
    this.router.navigate(['/login/admin']);
  }
}
