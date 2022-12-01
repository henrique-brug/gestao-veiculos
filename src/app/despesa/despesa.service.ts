import { Despesa } from './../model/despesa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RoutesAPI } from '../util/routes-api';
import { Observable } from 'rxjs';
import { ErrorUtil } from '../util/error-util';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  URL = RoutesAPI.DESPESA;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  save(transaction: Despesa): Observable<Despesa> {
    return this.httpClient.post<Despesa>(
      this.URL,
      transaction,
      this.httpOptions
    );
  }

  getByVeiculo(veiculoId: number): Observable<Despesa[]> {
    return this.httpClient
      .get<Despesa[]>(`${this.URL}/veiculoId/${veiculoId}`)
      .pipe(catchError(ErrorUtil.handleError));
  }
}
