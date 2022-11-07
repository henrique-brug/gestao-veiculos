import { VeiculoStorageService } from './veiculo-storage.service';
import { Veiculo } from './../model/veiculo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LandPageComponent } from '../land-page/land-page.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-cadastro-veiculo',
  templateUrl: './form-cadastro-veiculo.component.html',
  styleUrls: ['./form-cadastro-veiculo.component.css'],
  providers: [VeiculoStorageService],
})
export class FormCadastroVeiculoComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  veiculo!: Veiculo;
  veiculoNovo: Boolean = true;
  titulo: String = 'Cadastrar veículo:';
  message: String = '';
  color = '';

  constructor(
    private route: ActivatedRoute,
    private veiculoService: VeiculoStorageService
  ) {}

  ngOnInit(): void {
    let idParam: number = +this.route.snapshot.paramMap.get('idVeiculo')!;
    if (idParam != 0) {
      let veiculos = this.veiculoService.getVeiculos().filter((v) => {
        return v.idVeiculo === idParam;
      });
      this.veiculo = veiculos[0];
      this.veiculoNovo = false;
      this.titulo = 'Editar veículo:';
    } else {
      this.veiculo = new Veiculo('', '');
    }
  }

  currentStyles = {
    background: this.color,
  };

  onSubmit() {
    if (this.veiculoService.isExist(this.veiculo.placa) && this.veiculoNovo) {
      this.gerenciarMessage(
        `Ja existe um veículo cadastrado com esta placa: ${this.veiculo.placa}!`,
        false
      );
      return;
    }
    if (this.veiculoNovo) {
      this.veiculo.idVeiculo = this.veiculoService.getTotalVeiculos() + 1;
      this.veiculoService.save(this.veiculo);
      this.gerenciarMessage(
        `Veículo  ${this.veiculo.modelo} cadastrado com sucesso!`
      );
    } else {
      this.veiculoService.update(this.veiculo);
      this.gerenciarMessage(
        `Veículo  ${this.veiculo.modelo} alterado com sucesso!`
      );
    }
    this.form.reset();
    this.veiculo = new Veiculo('', '');
    this.veiculoNovo = true;
    this.titulo = 'Cadastrar veículo:';
  }

  gerenciarMessage(message: String, sucesso: Boolean = true) {
    if (sucesso) {
      this.color = '#2286d2';
    } else {
      this.color = '#ff3f3f';
    }
    this.currentStyles = {
      background: this.color,
    };
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
