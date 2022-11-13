export class Veiculo {
  constructor(
    public id: number = 0,
    public modelo: string,
    public placa: string
  ) {
    this.id = Math.round(Math.random() * 1000);
    this.modelo = modelo;
    this.placa = placa;
  }
}
