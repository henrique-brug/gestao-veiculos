export class Despesa {
  public veiculoId!: number;
  data: Date;
  constructor(
    public id: number = 0,
    public valor: number,
    public nomeDespesa: string,
    public descricao: string
  ) {
    this.id = Math.round(Math.random() * 1000);
    this.data = new Date();
    this.valor = valor;
    this.nomeDespesa = nomeDespesa;
    this.descricao = descricao;
  }
}
