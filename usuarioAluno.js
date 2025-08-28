import { Usuario } from './usuario.js';

export class UsuarioAluno extends Usuario {
  #matricula;
  tipo = 'aluno';

  constructor(nome, id = null) {
    super(nome, id);
    this.#matricula = this.gerarMatricula();
  }

  // Métodos específicos do aluno

  gerarMatricula() {
    const nomeAluno = this.nome;
    const numero = Math.floor(Math.random() * 10000);
    return `${nomeAluno}${numero}`;
  }

  get matricula() {
    return this.#matricula;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      tipo: this.tipo,
      matricula: this.#matricula
    };
  }
}