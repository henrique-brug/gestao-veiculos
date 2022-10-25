export class Veiculo {
  id?: number;

  constructor(public modelo: string, public placa: string) {
    this.modelo = modelo;
    this.placa = placa;
  }
}
