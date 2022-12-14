import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Veiculo } from '../model/veiculo';
import { VeiculoPromiseService } from '../services/veiculo-promise.service';
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
    this.delete(veiculo.id);
    this.save(veiculo);
  }

  delete(id: number): boolean {
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    this.veiculos = this.veiculos.filter((v) => {
      return v.id != id;
    });

    WebStorageUtil.set(Constants.VEICULOS_KEY, this.veiculos);
    return true;
  }

  isExist(placa: string): boolean {
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    for (let v of this.veiculos) {
      if (v.placa?.valueOf() == placa?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getVeiculos(): Veiculo[] {
    this.veiculos = WebStorageUtil.get(Constants.VEICULOS_KEY);
    return this.veiculos;
  }

  setVeiculos(veiculos: Veiculo[]) {
    localStorage.setItem(Constants.VEICULOS_KEY, JSON.stringify(veiculos));
  }

  getTotalVeiculos(): number {
    return this.getVeiculos()?.length;
  }
  /*
  asObservable(): Observable<number> {
    return this.veiculoSource;
  }*/
}
