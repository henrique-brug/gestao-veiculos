import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conta } from '../model/conta';
import { RoutesAPI } from '../util/routes-api';
import { Observable } from 'rxjs';
import { ErrorUtil } from '../util/error-util';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  URL = RoutesAPI.CONTA;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  save(conta: Conta): Observable<Conta> {
    return this.httpClient.post<Conta>(this.URL, conta, this.httpOptions);
  }

  patch(conta: Conta): Observable<Conta> {
    return this.httpClient.patch<Conta>(
      `${RoutesAPI.CONTA}/${conta.id}`,
      conta,
      this.httpOptions
    );
  }

  getById(id: number): Observable<Conta[]> {
    const query: HttpParams = new HttpParams().set('id', id);
    const options = id ? { params: query } : {};

    return this.httpClient
      .get<Conta[]>(`${RoutesAPI.CONTA}`, options)
      .pipe(catchError(ErrorUtil.handleError));
  }
}
