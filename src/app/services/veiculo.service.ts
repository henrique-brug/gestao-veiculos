import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from './../model/veiculo';
import { RoutesAPI } from '../util/routes-api';
import { ErrorUtil } from '../util/error-util';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getByPlaca(placa: string): Observable<Veiculo[]> {
    const query: HttpParams = new HttpParams().set('username', placa);
    const options = placa ? { params: query } : {};

    return this.httpClient.get<Veiculo[]>(`${RoutesAPI.VEICULO}`, options).pipe(
      catchError(ErrorUtil.handleError)
    );
  }
}
