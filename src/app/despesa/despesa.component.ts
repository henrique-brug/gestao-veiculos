import { LandPageComponent } from './../land-page/land-page.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from '../model/veiculo';
import { Conta } from '../model/conta';
import { Despesa } from '../model/despesa';
import { VeiculoStorageService } from '../form-cadastro-veiculo/veiculo-storage.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
  providers: [VeiculoStorageService],
})
export class DespesaComponent implements OnInit {
  veiculo!: Veiculo;
  conta: Conta = LandPageComponent.conta;
  despesa: Despesa = new Despesa(0, '', '');

  constructor(
    private route: ActivatedRoute,
    private veiculoService: VeiculoStorageService
  ) {}

  ngOnInit(): void {
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;
    let veiculos = this.veiculoService.getVeiculos().filter((v) => {
      return v.id === idParam;
    });
    this.veiculo = veiculos[0];
  }

  onSubmit(): void {}
}
