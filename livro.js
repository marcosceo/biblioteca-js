export class Livro {
  #id = '';
  #titulo = '';
  #autor;
  #anoPublicacao = 0;
  #genero = '';
  disponivel = true;

  constructor(titulo, autor, anoPublicacao, genero, disponivel = true, id = null) {
    this.#titulo = titulo;
    this.#autor = autor;
    this.#anoPublicacao = anoPublicacao;
    this.#genero = genero;
    this.disponivel = disponivel;
    this.#id = id || Livro.geraId();
  }

  static geraId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get autor() {
    return this.#autor;
  }

  get anoPublicacao() {
    return this.#anoPublicacao;
  }

  get genero() {
    return this.#genero;
  }

  estaDisponivel() {  
    return this.disponivel;
  }

  set titulo(novoTitulo) {
    this.#titulo = novoTitulo;
  }

  set autor(novoAutor) {
    this.#autor = novoAutor;
  }

  set anoPublicacao(novoAno) {
    this.#anoPublicacao = novoAno;
  }

  set genero(novoGenero) {
    this.#genero = novoGenero;
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      autor: this.autor.nome,
      anoPublicacao: this.anoPublicacao,
      genero: this.genero,
      disponivel: this.disponivel
    };
  }

}

