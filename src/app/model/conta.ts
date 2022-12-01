export class Conta {
  constructor(public id: number = 0, public saldo: number) {
    this.id = Math.round(Math.random() * 1000);
    this.saldo = saldo;
  }
}
