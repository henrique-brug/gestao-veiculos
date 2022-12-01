import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css'],
})
export class SaldoComponent implements OnInit {
  saldoOld: number = 0;
  criacaoComponent: Boolean = true;
  color = '#2286d2';
  @Input() saldoConta: number = 0;
  @Output() messageSaldoEvent = new EventEmitter<String>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.saldoConta != this.saldoOld) {
      let valorAdicionado = this.saldoConta - this.saldoOld;
      /* Não mostra a mensagem de depósito se o componente estiver sendo criado*/
      if (!this.criacaoComponent) {
        setTimeout(() => {
          this.messageSaldoEvent.emit(
            `Depósito de R$ ${valorAdicionado} realizado com sucesso!`
          );
        }, 1000);
      }
      this.saldoOld = this.saldoConta;
      this.criacaoComponent = false;

      if (this.saldoConta >= 0) {
        this.color = '#2286d2';
      } else {
        this.color = '#ff3f3f';
      }
      this.currentStyles = {
        background: this.color,
      };
    }
  }
  currentStyles = {
    background: this.color,
  };
}
