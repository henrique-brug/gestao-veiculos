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

  /**
   * Transforma um objeto pego da API para a versão salva no WebStorage
   * @param veiculo
   * @returns
   */
  public static toWS(veiculo: Veiculo) {
    let v: Veiculo = new Veiculo(veiculo.id, veiculo.modelo, veiculo.placa);
    v.id = veiculo.id;
    v.modelo = veiculo.modelo;
    v.placa = veiculo.placa;
    return v;
  }
}
