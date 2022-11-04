import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Veiculo } from '../model/veiculo';
import { Constants } from '../util/constantes';
import { WebStorageUtil } from '../util/web-storage-util';

@Injectable()
export class VeiculoStorageService {
  veiculos!: Veiculo[];
  private veiculoSource!: BehaviorSubject<number>;

  constructor() {
    if (localStorage.getItem(Constants.VEICULOS_KEY) == null) {
      localStorage.setItem(Constants.VEICULOS_KEY, JSON.stringify([]));
    }
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    this.veiculoSource = new BehaviorSubject<number>(this.veiculos.length);
  }

  save(veiculo: Veiculo) {
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    this.veiculos.push(veiculo);
    WebStorageUtil.set(Constants.VEICULOS_KEY, this.veiculos);
  }

  update(veiculo: Veiculo) {
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    this.delete(veiculo.placa);
    this.save(veiculo);
  }

  delete(placa: string): boolean {
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    this.veiculos = this.veiculos.filter((v) => {
      return v.placa?.valueOf() != placa?.valueOf();
    });

    WebStorageUtil.set(Constants.VEICULOS_KEY, this.veiculos);
    return true;
  }

  isExist(value: string): boolean {
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    for (let v of this.veiculos) {
      if (v.placa?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getUsers(): Veiculo[] {
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    return this.veiculos;
  }
/*
  notifyTotalUsers() {
    this.veiculoSource.next(this.getUsers()?.length);
  }

  asObservable(): Observable<number> {
    return this.veiculoSource;
  }*/
}
