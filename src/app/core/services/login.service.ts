import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { UserListResponse, UserResponse } from 'src/app/shared/responses/user-response';
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

  constructor(private http: HttpClient,  private messageService: MessageService) { }  

  // Functions
  // Return the user variable
  public getUser() { 
    this.user = localStorage.getItem('userName') || 'login';
    return this.user; 
  }

  // Set the user variable
  public setUser(user: string) { this.user = user; }

  public getIsAdmin() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    return this.isAdmin; 
  }

  public setIsAdmin(isAdmin: boolean) { this.isAdmin = isAdmin}

  public logout(): void { 
    this.user = 'Login';
    this.isAdmin = false;
    this.sendUserName.emit(this.user);
  }

  // Login user
  public login(user: User) : Observable<UserResponse> {
    return this.http.post<UserResponse>(this.url + '/user/login', user).pipe(tap((loggedIn: UserResponse) => this.checkUser(loggedIn.user)), catchError(this.handleError<UserResponse>('login')));
  }
  
  public getUsers() : Observable<UserListResponse> {
    return this.http.get<UserListResponse>(this.url + '/user').pipe(tap(), catchError(this.handleError<UserListResponse>('getUsers')));
  }

  public deleteUser(id: number) : Observable<void> {
    return this.http.delete<void>(this.url + `/user/delete/${id}`).pipe(tap(), catchError(this.handleError<void>('deleteUser')));
  }

  public createUser(user: User): Observable<UserResponse>{
    return this.http.post<UserResponse>(this.url + '/user/addUser', user).pipe(tap(), catchError(this.handleError<UserResponse>('createUser')));
  }

  public updateUser(user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(this.url + '/user/update', user).pipe(tap(), catchError(this.handleError<UserResponse>('updateUser')));
  }

  // Check what kind user is logging in and set the user name
  public checkUser(user: User) : void {
    if (!user) return;
    this.isAdmin = user.isAdmin || false;
    this.setUser(user.userName);
    this.sendUserName.emit(user.userName);
  }

  private handleError<T>(operation: string, result?: T): any {
    return(error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`${message}`);
  }
}
