import { ViaCepService } from './via-cep.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ViaCepResponse } from 'src/app/shared/responses/via-cep-responde';
import { MessageService } from '../helpers/message.service';

describe('ViaCepService', () => {
  let service: ViaCepService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViaCepService, MessageService]
    });

    service = TestBed.inject(ViaCepService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a cep response', () => {
    const cep = '01001000';
    const expectedResponse: ViaCepResponse = {
      cep: "01001-000",
      logradouro: "Praça da Sé",
      complemento: "lado ímpar",
      bairro: "Sé",
      localidade: "São Paulo",
      uf: "SP",
      ibge: "3550308",
      gia: "1004",
      ddd: "11",
      siafi: "7107"
    };

    service.getCep(cep).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const request = httpTestingController.expectOne(`https://viacep.com.br/ws/${cep}/json/`);
    expect(request.request.method).toEqual('GET');
    request.flush(expectedResponse);
  });

  it('should return an error response', () => {
    const cep = '00000000';
    const expectedResponse = {
      erro: true
    };

    service.getCep(cep).subscribe({
      error: (error) =>  expect(error.erro).toEqual(expectedResponse) 
    });

    const request = httpTestingController.expectOne(`https://viacep.com.br/ws/${cep}/json/`);
    expect(request.request.method).toEqual('GET');
    request.flush(expectedResponse, { status: 404, statusText: 'Not Found' });
  });
});