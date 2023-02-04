import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthTokenInterceptor } from '../authentication/auth-token.interceptor';
import { MessageService } from '../helpers/message.service';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService : LoginService, private router: Router, private messageService: MessageService, private auth: AuthTokenInterceptor) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.auth.token = localStorage.getItem('authToken');
    if (this.loginService.getIsAdmin() && this.auth.token) return true;
    this.messageService.add("You must be a admin to enter here");
    this.router.navigate(['/home']);
    return false;
  }
}
