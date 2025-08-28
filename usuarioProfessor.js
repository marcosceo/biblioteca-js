import { Usuario } from './usuario.js';

export class UsuarioProfessor extends Usuario {
  #registro = '';
  tipo = 'professor';

  constructor(nome, id = null) {
    super(nome, id);
    this.#registro = this.gerarRegistro();
  }

  buscaPrazoDevolucao(dataEmprestimo) {
    const prazo = new Date(dataEmprestimo);
    prazo.setDate(prazo.getDate() + 14);
    return prazo;
  }

  gerarRegistro() {
    const nomeProfessor = this.nome;
    const numero = Math.floor(Math.random() * 10000);
    return `${nomeProfessor}${numero}`;
  }

  get registro() {
    return this.#registro;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      tipo: this.tipo,
      registro: this.#registro
    };
  }
}
