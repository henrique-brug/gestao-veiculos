import { Veiculo } from './../model/veiculo';
import { VeiculoPromiseService } from '../services/veiculo-promise.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RoutesAPI } from '../util/routes-api';
import { ErrorUtil } from '../util/error-util';

@Injectable({
  providedIn: 'root',
})
export class VeiculoComponentService {
  constructor(
    private veiculoPromiseService: VeiculoPromiseService,
    private httpClient: HttpClient
  ) {}

  do(veiculo: Veiculo, novo: Boolean): Promise<number> {
    const p = new Promise<number>((resolve, reject) => {
      this.veiculoPromiseService
        .getByPlaca(veiculo.placa)
        .then((veiculos: Veiculo[]) => {
          if (veiculo.modelo.length < 3) {
            reject('Opps!!! O modelo deve possuir 3 caracteres ou mais!');
          }

          let v;

          if (novo && veiculos.length > 0) {
            reject('Já existe um veículo cadastrado com essa placa!');
          } else if (novo) {
            v = this.veiculoPromiseService.save(veiculo);
          } else {
            v = this.veiculoPromiseService.update(veiculo);
          }
          Promise.all([v])
            .then((values) => {
              resolve(values[0]!.id);
            })
            .catch((e) => {
              reject('Não foi possível realizar a operação! Error: ' + e);
            });
        })
        .catch((e) => {
          reject(e);
        });
    });

    return p;
  }

  delete(id: number): Promise<number> {
    const p = new Promise<number>((resolve, reject) => {
      this.veiculoPromiseService
        .getById(id)
        .then((veiculos: Veiculo[]) => {
          let v;
          if (veiculos) {
            v = this.veiculoPromiseService.delete(id);
          }
          Promise.all([v])
            .then((values) => {
              resolve(values[0]!.id);
            })
            .catch((e) => {
              reject('Opps!!! Não foi possível deletar o veículo!');
            });
        })
        .catch((e) => {
          reject('Veículo selecionado não foi encontrado!');
        });
    });
    return p;
  }

  getAllVeiculos(): Observable<Veiculo[]> {
    return this.httpClient
      .get<Veiculo[]>(`${RoutesAPI.VEICULO}`)
      .pipe(catchError(ErrorUtil.handleError));
  }

  /*Método ja existe em veiculo-promisse, mas foi recriado aqui para
  um exemplo de retorno em observable*/
  getById(id: number): Observable<Veiculo[]> {
    const query: HttpParams = new HttpParams().set('id', id);
    const options = id ? { params: query } : {};

    return this.httpClient
      .get<Veiculo[]>(`${RoutesAPI.VEICULO}`, options)
      .pipe(catchError(ErrorUtil.handleError));
  }
}
