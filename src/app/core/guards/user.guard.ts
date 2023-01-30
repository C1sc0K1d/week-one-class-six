import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthTokenInterceptor } from '../authentication/auth-token.interceptor';
import { MessageService } from '../helpers/message.service';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private loginService : LoginService, private router: Router, private messageService: MessageService, private auth: AuthTokenInterceptor) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.loginService.getUser().toLowerCase() !== 'login' && this.auth) return true;
    this.messageService.add("Not logged in");
    this.router.navigate(['/home']);
    return false;
  }
}
