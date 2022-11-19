export class Despesa {
  public veiculoId!: number;
  constructor(
    public id: number = 0,
    public valor: number,
    public nomeDespesa: string,
    public descricao: string
  ) {
    this.id = Math.round(Math.random() * 1000);
    this.valor = valor;
    this.nomeDespesa = nomeDespesa;
    this.descricao = descricao;
  }
  /**
   * Transforma um objeto pego da API para a versão salva no WebStorage
   * @param depesa
   * @returns
   */
  /*public static toWS(despesa: Despesa) {
    let d: Despesa = new Veiculo(despesa.id, despesa.modelo, despesa.placa);
    v.id = despesa.id;
    v.modelo = veiculo.modelo;
    v.placa = veiculo.placa;
    return v;
  }*/
}
