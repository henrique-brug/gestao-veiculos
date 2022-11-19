import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Despesa } from '../model/despesa';
import { RoutesAPI } from '../util/routes-api';
import { Observable } from 'rxjs';

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
}
