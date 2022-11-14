import { VeiculoStorageService } from './veiculo-storage.service';
import { Veiculo } from './../model/veiculo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LandPageComponent } from '../land-page/land-page.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VeiculoComponentService } from './veiculo-component.service';

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
  titulo: String = 'Cadastrar';
  message: String = '';
  color = '';

  constructor(
    private route: ActivatedRoute,
    private veiculoComponentService: VeiculoComponentService,
    private veiculoStorage: VeiculoStorageService
  ) {}

  ngOnInit(): void {
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;
    if (idParam != 0) {
      let veiculos = this.veiculoStorage.getVeiculos().filter((v) => {
        return v.id === idParam;
      });
      this.veiculo = veiculos[0];
      this.veiculoNovo = false;
      this.titulo = 'Editar';
    } else {
      this.veiculo = new Veiculo(0, '', '');
    }
  }

  currentStyles = {
    background: this.color,
  };

  onSubmit() {
    this.veiculoComponentService
      .do(this.veiculo, this.veiculoNovo)
      .then((veiculo) => {
        this.gerenciarMessage(`Veículo cadastrado com sucesso!`, true);
        if (this.veiculoNovo) {
          this.veiculoStorage.save(this.veiculo);
        } else {
          this.veiculoStorage.update(this.veiculo);
        }
        this.form.reset();
        this.veiculo = new Veiculo(0, '', '');
        this.veiculoNovo = true;
        this.titulo = 'Cadastrar';
      })
      .catch((e) => {
        this.gerenciarMessage(e, false);
      });
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
