import { ContaService } from './../saldo/conta.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeiculoComponentService } from '../form-cadastro-veiculo/veiculo-component.service';
import { Despesa } from '../model/despesa';
import { Veiculo } from '../model/veiculo';
import { DespesaService } from './despesa.service';
import { Observable, throwError } from 'rxjs';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { ErrorUtil } from '../util/error-util';
import { Conta } from '../model/conta';

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
    private despesaService: DespesaService,
    private contaService: ContaService
  ) {}

  do(veiculoId: number, despesa: Despesa, conta: Conta): Observable<Despesa> {
    if (despesa.nomeDespesa.length < 4) {
      return throwError(
        new Error('O nome da despesa deve possuir 4 caracteres ou mais!')
      );
    }
    let result$ = this.veiculoComponentService.getById(veiculoId).pipe(
      map((veiculos) => veiculos[0]),
      tap((veiculo) => {
        this.veiculo = veiculo;
      }),
      concatMap((veiculo: Veiculo) => {
        despesa.veiculoId = veiculo.id;
        conta.saldo = conta.saldo - despesa.valor;

        const result$ = this.contaService.patch(conta).pipe(
          concatMap(() => {
            return this.despesaService.save(despesa);
          })
        );
        return result$;
      }),
      catchError(ErrorUtil.handleError)
    );
    return result$;
  }
}
