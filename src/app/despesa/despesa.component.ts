import { LandPageComponent } from './../land-page/land-page.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from '../model/veiculo';
import { Conta } from '../model/conta';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
})
export class DespesaComponent implements OnInit {
  veiculo!: Veiculo;
  conta: Conta = LandPageComponent.conta;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let idParam: number = +this.route.snapshot.paramMap.get('idVeiculo')!;
    let veiculos = LandPageComponent.veiculos.filter((v) => {
      return v.idVeiculo === idParam;
    });
    this.veiculo = veiculos[0];
  }
}
