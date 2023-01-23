import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Emitter
  public sendUserName = new EventEmitter<string>();
  
  // Variables
  private user: string = 'Login';

  constructor(private router: Router) { }  

  // Functions
  // Return the user variable
  public getUser() { return this.user; }

  // Set the user variable
  public setUser(user: string) { this.user = user; }

  // Check what user is logging in
  public checkUser() : void { 
    if (this.user === 'admin') {
      this.sendUserName.emit(this.user);
      this.router.navigate(['/login/admin']);
    } else if (this.user === 'fulano'){
       this.sendUserName.emit(this.user);
       this.router.navigate(['/login/user']);
      } else {
        this.sendUserName.emit(this.user);
        this.router.navigate(['/home']);
      }
    }
}
