import { Veiculo } from './../model/veiculo';
import { Component, OnInit } from '@angular/core';
import { Conta } from '../model/conta';
import { FormCadastroVeiculoComponent } from '../form-cadastro-veiculo/form-cadastro-veiculo.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
})
export class LandPageComponent implements OnInit {
  public static veiculos: Array<Veiculo> = [];
  public static conta = new Conta();
  conta: Conta = new Conta();
  veiculos: Array<Veiculo> = [];
  saldoMessage: String = '';
  valorSoma: number = 0;
  mostrarSoma = false;
  color = '#2286d2';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if (LandPageComponent.veiculos.length == 0) {
      LandPageComponent.veiculos.push(new Veiculo('Honda', 'ADS-2S14', 1));
      LandPageComponent.veiculos.push(new Veiculo('Gol', 'MJF-8D45', 2));
      LandPageComponent.veiculos.push(new Veiculo('Man', 'CXS-4S57', 3));
      LandPageComponent.veiculos.push(new Veiculo('Palio', 'ADS-2S14', 4));
      LandPageComponent.veiculos.push(new Veiculo('Fan/125', 'MJF-8D45', 5));
      LandPageComponent.veiculos.push(new Veiculo('Mustang', 'CXS-4S57', 6));
    }
    this.veiculos = LandPageComponent.veiculos;
    this.conta = LandPageComponent.conta;
  }

  expandirSoma() {
    this.mostrarSoma = true;
  }

  realizarSoma() {
    this.conta.saldo += this.valorSoma;
    this.mostrarSoma = false;
    this.valorSoma = 0;
  }

  messageSaldoEvent(event: String) {
    this.saldoMessage = event;
    setTimeout(() => {
      this.saldoMessage = '';
    }, 3000);
  }

  currentStyles = {
    background: this.color,
  };

  onClickItem(v: Veiculo) {
    this.router.navigate(['/adicionar-despesa', v?.idVeiculo]);
  }

  ngOnDestroy(): void {
    LandPageComponent.conta = this.conta;
  }
}
