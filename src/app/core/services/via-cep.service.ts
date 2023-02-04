import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ViaCepResponse } from 'src/app/shared/responses/via-cep-responde';
import { MessageService } from '../helpers/message.service';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private url = 'https://viacep.com.br/ws/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,  private messageService: MessageService) { }

  public getCep(cep: string) : Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`${this.url + cep}/json/` ).pipe(tap(), catchError(this.handleError<ViaCepResponse>('getCep')));
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
