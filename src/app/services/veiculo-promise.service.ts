import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Veiculo } from '../model/veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoPromiseService {
  URL = 'http://localhost:3000/veiculo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getByPlaca(placa: string): Promise<Veiculo[]> {
    return this.httpClient
      .get<Veiculo[]>(`${this.URL}/placa/${placa}`)
      .toPromise();
  }

  getAll(): Promise<Veiculo[]> {
    return this.httpClient.get<Veiculo[]>(`${this.URL}/veiculo`).toPromise();
  }

  save(veiculo: Veiculo): Promise<Veiculo> {
    return this.httpClient
      .post<Veiculo>(this.URL, JSON.stringify(veiculo), this.httpOptions)
      .toPromise();
  }

  patch(veiculo: Veiculo): Promise<Veiculo> {
    return this.httpClient
      .patch<Veiculo>(
        `${this.URL}/${veiculo.id}`,
        JSON.stringify(veiculo),
        this.httpOptions
      )
      .toPromise();
  }

  update(veiculo: Veiculo): Promise<Veiculo> {
    return this.httpClient
      .put<Veiculo>(
        `${this.URL}/${veiculo.id}`,
        JSON.stringify(veiculo),
        this.httpOptions
      )
      .toPromise();
  }
}
