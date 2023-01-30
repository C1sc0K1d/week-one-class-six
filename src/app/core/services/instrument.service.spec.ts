import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from 'src/app/shared/interfaces/product';
import { InstrumentService } from './instrument.service';
import { environment } from 'src/environments/environment';
import { ProductListResponse, ProductResponse } from 'src/app/shared/responses/product-response';
import { MessageService } from '../helpers/message.service';

describe('InstrumentService', () => {
  let service: InstrumentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstrumentService, MessageService]
  });
    service = TestBed.inject(InstrumentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of instruments', () => {
    const dummyInstruments: ProductListResponse = {
      instruments: [
        {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'},
        {id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, type: 'wind'}
      ]
    };

    service.getAllInstruments().subscribe(instruments => {
      expect(instruments).toEqual(dummyInstruments);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/instrument`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInstruments);
  });

  it('should add an instrument', () => {
    const dummyProduct: Product = {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'};

    const dummyProductResponse: ProductResponse = {
      instrument: {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'}
    };

    service.addInstrument(dummyProduct).subscribe(product => {
      expect(product).toEqual(dummyProductResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/instrument/add`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyProductResponse);
  });
});