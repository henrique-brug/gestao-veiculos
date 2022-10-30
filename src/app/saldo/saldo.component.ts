import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css'],
})
export class SaldoComponent implements OnInit {
  saldoOld: number = 0;
  @Input() saldoConta: number = 0;
  @Output() messageSaldoEvent = new EventEmitter<String>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.saldoConta != this.saldoOld) {
      let valorAdicionado = this.saldoConta - this.saldoOld;
      setTimeout(() => {
        this.messageSaldoEvent.emit(
          `Depósito de R$ ${valorAdicionado} realizado com sucesso!`
        );
      }, 1000);
      this.saldoOld = this.saldoConta;
    }
  }
}
