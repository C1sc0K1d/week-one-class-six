import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { UserResponse } from 'src/app/shared/responses/user-response';
import { environment } from 'src/environments/environment';
import { MessageService } from '../helpers/message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' })
  };

  // Emitter
  public sendUserName = new EventEmitter<string>();
  
  // Variables
  private user: string = 'Login';

  private isAdmin: boolean = false;

  constructor(private router: Router, private http: HttpClient,  private messageService: MessageService) { }  

  // Functions
  // Return the user variable
  public getUser() { return this.user; }

  // Set the user variable
  public setUser(user: string) { this.user = user; }

  public getIsAdmin() { return this.isAdmin; }

  public setIsAdmin(isAdmin: boolean) { this.isAdmin = isAdmin}

  public logout(): void { 
    this.user = 'Login';
    this.isAdmin = false;
    this.sendUserName.emit(this.user);
  }

  // Login user
  public login(user: User) : Observable<UserResponse> {
    console.log(user);
    
    return this.http.post<UserResponse>(this.url + '/user/login', user).pipe(tap((loggedIn: UserResponse) => this.checkUser(loggedIn.user)), catchError(this.handleError<UserResponse>('login')));
  }

  public createUser(user: User): Observable<UserResponse>{return this.http.post<UserResponse>(this.url + '/user/addUser', user).pipe(tap(), catchError(this.handleError<UserResponse>('createUser')));}

  // Check what kind user is logging in and set the user name
  public checkUser(user: User) : void {
    if (!user) return;
    this.isAdmin = user.isAdmin || false;
    this.setUser(user.userName);
    this.sendUserName.emit(user.userName);
  }

    private handleError<T>(operation: string, result?: T): any {
      return(error: any): Observable<T> => {
        console.error(error.error.message);
        this.log(`${operation} failed: ${error.error.message}`);
        return of(result as T);
      };
    }
  
    private log(message: string): void {
      this.messageService.add(`${message}`);
    }
}
