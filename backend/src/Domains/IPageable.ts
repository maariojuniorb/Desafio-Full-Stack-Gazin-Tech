export default class Page {
  private _paginaAtual: number;
  private _tamanhoPagina: number;

  constructor(paginaAtual: number, tamanhoPagina: number) {
    this._paginaAtual = paginaAtual;
    this._tamanhoPagina = tamanhoPagina;
  }

  public getOffset = () => this._paginaAtual * this._tamanhoPagina;

  public getLimit = () => this.getOffset() + this._tamanhoPagina;
}
