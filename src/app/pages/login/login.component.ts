import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  // FUnctions
  ngOnInit(): void {
  }

  // Set the user that is logging in
  logIn(user: string): void {
    this.loginService.setUser(user);
    this.loginService.checkUser();
  }
}
