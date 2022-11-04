import { VeiculoStorageService } from './veiculo-storage.service';
import { Veiculo } from './../model/veiculo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LandPageComponent } from '../land-page/land-page.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-cadastro-veiculo',
  templateUrl: './form-cadastro-veiculo.component.html',
  styleUrls: ['./form-cadastro-veiculo.component.css'],
  providers: [VeiculoStorageService],
})
export class FormCadastroVeiculoComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  veiculo!: Veiculo;

  constructor(private veiculoService: VeiculoStorageService) {}

  ngOnInit(): void {
    this.veiculo = new Veiculo('', '');
  }

  onSubmit() {
    this.veiculoService.save(this.veiculo);
    this.form.reset();
    this.veiculo = new Veiculo('', '');
    M.toast({
      html: `Veículo modelo ${this.veiculo.modelo} cadastrado com sucesso!`,
    });
  }
}
