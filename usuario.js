export class Usuario {  
  #id = '';
  #nome = '';
  #historicoEmprestimos = []; // Array com os IDs dos empréstimos

  constructor(nome, id = null) {
    this.#nome = nome;
    this.#id = id || Usuario.geraId();
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

  buscaPrazoDevolucao(dataEmprestimo) {
    const prazo = new Date(dataEmprestimo);
    prazo.setDate(prazo.getDate() + 7);
    return prazo;
  }

  get historicoEmprestimos() {
    return this.#historicoEmprestimos;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  adicionarEmprestimo(emprestimoId) {
    this.#historicoEmprestimos.push(emprestimoId);
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome
    };
  } 
}
