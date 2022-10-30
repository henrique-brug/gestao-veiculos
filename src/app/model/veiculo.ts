export class Veiculo {
  idVeiculo?: number;

  constructor(
    public modelo: string,
    public placa: string,
    idVeiculo: number = 0
  ) {
    this.modelo = modelo;
    this.placa = placa;
    this.idVeiculo = idVeiculo;
  }
}
