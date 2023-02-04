import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor() {}

  public token: string | null = null;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {      
      let autorizedRequest = request.clone({ setHeaders: { "Authorization": "Token " + this.token } });
      return next.handle(autorizedRequest).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const headers = event.headers;
            console.log(headers.get('Token'));
          }
        })
      );
    }
    return next.handle(request);
  }
}
