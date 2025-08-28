export class Autor {
  #id = '';
  #nome = '';
  #nacionalidade = '';
  #anoNascimento = 0;

  constructor(nome, nacionalidade, anoNascimento, id = null) {
    this.#nome = nome;
    this.#nacionalidade = nacionalidade;
    this.#anoNascimento = anoNascimento;
    this.#id = id || Autor.geraId();
  }

  static geraId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome;
  }

  get nacionalidade() {
    return this.#nacionalidade;
  }

  get anoNascimento() {
    return this.#anoNascimento;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  set nacionalidade(novaNacionalidade) {
    this.#nacionalidade = novaNacionalidade;
  } 

  set anoNascimento(novoAno) {
    this.#anoNascimento = novoAno;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      nacionalidade: this.nacionalidade,
      anoNascimento: this.anoNascimento
    };
  }
}

