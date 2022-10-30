import { Veiculo } from './../model/veiculo';
import { Component, OnInit } from '@angular/core';
import { LandPageComponent } from '../land-page/land-page.component';

@Component({
  selector: 'app-form-cadastro-veiculo',
  templateUrl: './form-cadastro-veiculo.component.html',
  styleUrls: ['./form-cadastro-veiculo.component.css'],
})
export class FormCadastroVeiculoComponent implements OnInit {
  veiculo!: Veiculo;
  veiculoMensagem = '';
  veiculoValido = false;

  constructor() {}

  ngOnInit(): void {
    this.veiculoMensagem = '';
    this.veiculo = new Veiculo('', '');
  }

  onSubmit() {
    this.veiculoValido = false;
    if (this.veiculo.modelo.length < 3) {
      this.veiculoMensagem = 'O modelo deve possuir no mínimo 3 caracteres!';
    } else if (this.veiculo.placa.length != 7) {
      this.veiculoMensagem =
        'Placa inválida, por favor informe no seguinte formato: "ABC-1D23"';
    } else {
      LandPageComponent.veiculos.push(this.veiculo);
      this.veiculoMensagem = '';
      this.veiculoValido = true;
      this.veiculo = new Veiculo('', '');
      M.toast({
        html: `Veículo modelo ${this.veiculo.modelo} cadastrado com sucesso!`,
      });
    }
  }
}
