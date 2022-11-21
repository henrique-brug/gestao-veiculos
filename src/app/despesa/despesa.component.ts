import { DespesaComponentService } from './despesaComponent.service';
import { LandPageComponent } from './../land-page/land-page.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from '../model/veiculo';
import { Conta } from '../model/conta';
import { Despesa } from '../model/despesa';
import { VeiculoStorageService } from '../form-cadastro-veiculo/veiculo-storage.service';
import { NgForm } from '@angular/forms';
import { ContaService } from '../saldo/conta.service';
import { Constants } from '../util/constantes';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
  providers: [VeiculoStorageService],
})
export class DespesaComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  veiculo!: Veiculo;
  conta: Conta = new Conta(0, 0);
  despesa: Despesa = new Despesa(0, 0, '', '');
  message: String = '';
  color = '#2286d2';

  constructor(
    private route: ActivatedRoute,
    private veiculoService: VeiculoStorageService,
    private despesaComponentService: DespesaComponentService,
    private contaService: ContaService
  ) {}

  ngOnInit(): void {
    this.getConta();
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;
    let veiculos = this.veiculoService.getVeiculos().filter((v) => {
      return v.id === idParam;
    });
    this.veiculo = veiculos[0];
  }

  onSubmit(): void {
    if (this.despesa.valor > 0) {
      this.despesaComponentService.do(this.veiculo.id, this.despesa, this.conta).subscribe(
        (data: Despesa) => {
          this.mostrarMessage(
            `Despesa adicionada com sucesso no valor de R$ ${data.valor}!`,
            true
          );
          this.form.reset();
          this.despesa = new Despesa(0, 0, '', '');
        },
        (error) => {
          this.mostrarMessage(error.message, false);
        }
      );
    } else {
      this.mostrarMessage(
        'Você deve informar um valor maior que 0 para despesa!',
        false
      );
    }
  }

  getConta(): void {
    this.contaService.getById(Constants.CONTA_KEY).subscribe(
      (data) => {
        this.conta = data[0];
      },
      (error) => {
        this.mostrarMessage('Não foi possível recuperar a conta!', false);
      }
    );
  }

  mostrarMessage(message: String, sucess: Boolean = true): void {
    this.message = message;
    if (sucess) {
      this.color = '#2286d2';
    } else {
      this.color = '#ff3f3f';
    }
    this.currentStyles = {
      background: this.color,
    };
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  currentStyles = {
    background: this.color,
  };
}
