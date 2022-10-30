import { Component, OnInit } from '@angular/core';
import { Conta } from '../model/conta';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
})
export class LandPageComponent implements OnInit {
  conta: Conta = new Conta();
  saldoMessage: String = '';
  valorSoma: number = 0;
  mostrarSoma = false;
  color = '#2286d2';

  constructor() {}

  ngOnInit(): void {}

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
}
