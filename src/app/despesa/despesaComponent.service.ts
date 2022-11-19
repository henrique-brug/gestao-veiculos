import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeiculoComponentService } from '../form-cadastro-veiculo/veiculo-component.service';
import { Despesa } from '../model/despesa';
import { Veiculo } from '../model/veiculo';
import { DespesaService } from './despesa.service';
import { Observable } from 'rxjs';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { ErrorUtil } from '../util/error-util';

@Injectable({
  providedIn: 'root',
})
export class DespesaComponentService {
  veiculo!: Veiculo;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private veiculoComponentService: VeiculoComponentService,
    private despesaService: DespesaService
  ) {}

  do(veiculoId: number, despesa: Despesa): Observable<Despesa> {
    let result$ = this.veiculoComponentService.getById(veiculoId).pipe(
      map((veiculos) => veiculos[0]),
      tap((veiculo) => {
        this.veiculo = veiculo;
      }),
      concatMap((veiculo: Veiculo) => {
        despesa.veiculoId = veiculo.id;
        return this.despesaService.save(despesa);
      }),
      catchError(ErrorUtil.handleError)
    );
    return result$;
  }
}
