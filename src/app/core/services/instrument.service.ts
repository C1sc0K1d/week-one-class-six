import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { MessageService } from '../helpers/message.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductListResponse, ProductResponse } from 'src/app/shared/responses/product-response';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private url = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient,  private messageService: MessageService) { }

  public getAllInstruments(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.url + '/instrument').pipe(tap(), catchError(this.handleError<ProductListResponse>('getAllInstruments')));
  }

  public addInstrument(product: Product): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.url + "instrument/add", product).pipe(tap((newInstrument: ProductResponse) => this.log(`Instrumet ${newInstrument.instrument.name} ready to make some noisy!!`)), catchError(this.handleError<ProductResponse>('addInstrument')));
  }

  private handleError<T>(operation: string, result?: T): any {
    return(error: any): Observable<T> => {
      console.error(error.error.message);
      alert(error.error.message)
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`${message}`);
  }
}
