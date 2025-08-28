export class Emprestimo {
  #id = '';
  #livro;
  #usuario;
  #dataEmprestimo;
  #dataDevolucao;
  #estaAtivo;

  constructor(livro, usuario, dataEmprestimo, estaAtivo = true, id = null) {
    this.#livro = livro;
    this.#usuario = usuario;
    this.#dataEmprestimo = dataEmprestimo ? new Date(dataEmprestimo) : new Date();
    this.#dataDevolucao = this.buscarDataDevolucao();
    this.#estaAtivo = estaAtivo;
    this.#id = id || Emprestimo.geraId();
  }

  static geraId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  buscarDataDevolucao() {
    const prazo = this.usuario.buscaPrazoDevolucao(this.dataEmprestimo);
    return prazo;
  }

  get estaAtivo() {
    return this.#estaAtivo;
  }

  get id() {
    return this.#id;
  }

  get livro() {
    return this.#livro;
  }

  get usuario() {
    return this.#usuario;
  }

  get dataEmprestimo() {
    return this.#dataEmprestimo;
  }

  get dataDevolucao() {
    return this.#dataDevolucao;
  }

  set estaAtivo(estado) {
    this.#estaAtivo = estado;
  }


  registrarDevolucao(emprestimoId) {
    if(!this.estaAtivo) {
      return 'Empréstimo já foi devolvido.';
    }
    this.estaAtivo = false;
  }

  toJSON() {
    return {
      id: this.id,
      livro: this.livro.titulo,
      usuario: this.usuario.nome,
      dataEmprestimo: this.dataEmprestimo,
      dataDevolucao: this.dataDevolucao,
      estaAtivo: this.estaAtivo
    };
  }
}
