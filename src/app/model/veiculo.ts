export class Veiculo {
  constructor(
    public modelo: string,
    public placa: string,
    public idVeiculo: number = 0
  ) {
    this.modelo = modelo;
    this.placa = placa;
    this.idVeiculo = idVeiculo;
  }
}
