import { Veiculo } from '../model/veiculo';
import { VeiculoPromiseService } from '../services/veiculo-promise.service';
import { DebugEventListener, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constantes';
import { PlatformLocation } from '@angular/common';
import { VeiculoStorageService } from './veiculo-storage.service';

@Injectable({
  providedIn: 'root',
})
export class VeiculoComponentService {
  constructor(private veiculoPromiseService: VeiculoPromiseService) {}

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
              reject('Opps!!! Não foi possível cadastrar o veículo!');
            });
        })
        .catch((e) => {
          reject(e);
        });
    });

    return p;
  }

  /*delete(id: number): Promise<number> {
    const p = new Promise<number>((resolve, reject) => {
      this.veiculoPromiseService
        .getById(id)
        .then((veiculos: Veiculo[]) => {
          let v;
          if(veiculos.length > 0){
            this.veiculoPromiseService.delete(veiculos[0]);
          }
          Promise.resolve(v)
    }).catch((e) => {});
    return p;
  }*/
}
