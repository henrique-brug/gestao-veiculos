export class Despesa {
  idDespesa?: number;

  constructor(
    public valor: number,
    public nomeDespesa: string,
    public descricao: string,
    idDespesa: number = 0
  ) {
    this.valor = valor;
    this.nomeDespesa = nomeDespesa;
    this.descricao = descricao;
    this.idDespesa = idDespesa;
  }
}
