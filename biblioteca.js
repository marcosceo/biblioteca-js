import { Livro } from './livro.js';
import { Autor } from './autor.js';
import { Emprestimo } from './emprestimo.js';
import { UsuarioAluno } from './usuarioAluno.js';
import { UsuarioProfessor } from './usuarioProfessor.js';
import { Repository } from './repository.js';

export class Biblioteca {
  #usuarios = [];
  #livros = [];
  #autores = [];
  #emprestimos = [];

  constructor(doc = document, repo = new Repository()) {
    this.doc = doc;
    this.repo = repo;
    this.reidrataClasses();
  }

  reidrataClasses() {
    this.#autores = this.repo.listarAutores()
    .map(a => new Autor(a.nome, a.nacionalidade, a.anoNascimento, a.id));
    
    this.#usuarios = this.repo.listarUsuarios()
    .map(u => {
      let usuario;
      if (u.tipo === "aluno") {
        usuario = new UsuarioAluno(u.nome, u.id);
      } else {
        usuario = new UsuarioProfessor(u.nome, u.id);
      }
      return usuario;
    });

    this.#livros = this.repo.listarLivros()
    .map(l => {
      const autor = this.#autores.find(a => a.nome === l.autor);
      return new Livro(l.titulo, autor, l.anoPublicacao, l.genero, l.disponivel, l.id);
    });

    this.#emprestimos = this.repo.listarEmprestimos()
    .map(e => {
      const livro = this.#livros.find(l => l.titulo === e.livro);
      const usuario = this.#usuarios.find(u => u.nome === e.usuario);
      return new Emprestimo(livro, usuario, e.dataEmprestimo, e.estaAtivo, e.id);
    });
  }

  adicionarUsuario(nome, tipoUsuario) {
    let usuario = '';

    if(tipoUsuario !== "aluno" && tipoUsuario !== "professor") {
      alert("Tipo de usuário inválido! Usuários permitidos: aluno e professor.");
      return;
    }

    if (tipoUsuario === "aluno") {
      usuario = new UsuarioAluno(nome);
    } else {
      usuario = new UsuarioProfessor(nome);
    }
    this.#usuarios.push(usuario);
    this.repo.salvarUsuario(usuario);
  }

  adicionarLivro(titulo, id, anoPublicacao, genero) {
    const autorSelecionado = this.#autores.find(a => a.id === id);
    if (!autorSelecionado) {
        alert("Autor não encontrado! Adicione o autor antes de adicionar o livro.");
        return;
    }
    const livro = new Livro(titulo, autorSelecionado, anoPublicacao, genero);
    this.#livros.push(livro);
    this.repo.salvarLivro(livro);
  }

  adicionarAutor(nome, nacionalidade, anoNascimento) {
    const autor = new Autor(nome, nacionalidade, anoNascimento);
    this.#autores.push(autor);
    this.repo.salvarAutor(autor);
  }

  excluirUsuario(usuarioId) {
    const usuarioIndex = this.#usuarios.findIndex(u => u.id === usuarioId);
    if (usuarioIndex === -1) {
      alert("Usuário não encontrado.");
      return;
    }

    const emprestimoAtivo = this.#emprestimos.find(e => e.usuario.id === usuarioId && e.estaAtivo); 
    if (emprestimoAtivo) {
      alert("Não é possível excluir o usuário, pois ele possui empréstimos.");
      return;
    }
    this.#usuarios.splice(usuarioIndex, 1); 
    this.repo.atualizarUsuarios(this.#usuarios);
  }

  excluirLivro(livroId) {
    const livroIndex = this.#livros.findIndex(l => l.id === livroId);
    if (livroIndex === -1) {
      alert("Livro não encontrado.");
      return;
    }

    const emprestimoAtivo = this.#emprestimos.find(e => e.livro.id === livroId && e.estaAtivo); 
    if (emprestimoAtivo) {
      alert("Não é possível excluir o livro, pois ele está emprestado.");
      return;
    } 
    this.#livros.splice(livroIndex, 1);
    this.repo.atualizarLivros(this.#livros);
  }

  excluirAutor(autorId) {
    const autorIndex = this.#autores.findIndex(a => a.id === autorId);
    if (autorIndex === -1) {
      alert("Autor não encontrado.");
      return;
    }
    
    const autorativo = this.#livros.find(l => l.autor.id === autorId);
    if (autorativo) {
      alert("Não é possível excluir o autor, pois ele ainda possui livros cadastrados.");
      return;
    }
    this.#autores.splice(autorIndex, 1);
    this.repo.atualizarAutores(this.#autores);
  }

  editarUsuario(usuarioId, nome) {
    const usuario = this.#usuarios.find(u => u.id === usuarioId);
    if (!usuario) {
      console.log("Usuário não encontrado.");
      return;
    }
    usuario.nome = nome;
  }

  editarLivro(livroId, titulo, autor, anoPublicacao, genero) {
    const autorSelecionado = this.#autores.find(a => a.nome === autor);
    if (!autorSelecionado) {
      console.log("Autor não encontrado!");
      return;
    }
    const livro = this.#livros.find(l => l.id === livroId);
    if (!livro) {
      console.log("Livro não encontrado.");
      return;
    }
    livro.titulo = titulo;
    livro.autor = autorSelecionado;
    livro.anoPublicacao = anoPublicacao;
    livro.genero = genero;
  }

  editarAutor(autorId, nome, nacionalidade, anoNascimento) {
    const autor = this.#autores.find(a => a.id === autorId);
    if (!autor) {
      console.log("Autor não encontrado.");
      return;
    }
    autor.nome = nome;
    autor.nacionalidade = nacionalidade;
    autor.anoNascimento = anoNascimento;
  }

  realizarEmprestimo(livroId, usuarioId) {
    const livro = this.#livros.find(l => l.id === livroId);
    const usuario = this.#usuarios.find(u => u.id === usuarioId);

    if (!livro || !usuario) {
      alert("Livro ou usuário não encontrado.");
      return;
    }

    if (!livro.estaDisponivel()) {
      alert("Livro não está disponível para empréstimo.");
      return;
    }

    const emprestimo = new Emprestimo(livro, usuario);
    this.#emprestimos.push(emprestimo);
    usuario.adicionarEmprestimo(emprestimo.id);
    livro.disponivel = false;
    this.repo.salvarEmprestimo(emprestimo);
  }

  registrarDevolucao(emprestimoId) {
    const emprestimo = this.#emprestimos.find(e => e.id === emprestimoId);
    if (!emprestimo) {
      alert("Empréstimo não encontrado.");
      return;
    }
    emprestimo.registrarDevolucao();
    const livro = emprestimo.livro;
    livro.disponivel = true;
    this.repo.atualizarEmprestimos(this.#emprestimos);
  }

  listarEmprestimosAtivos() {
    const emprestimosAtivos = this.#emprestimos.filter(e => e.estaAtivo);
    if (emprestimosAtivos.length === 0) {
      return 'Não há empréstimos ativos!';
    }
    return emprestimosAtivos.map(e => e.toJSON());
  }

  get autores() {
    return this.#autores.map(autor => autor.toJSON());
  }

  get livros() {
    return this.#livros.map(livro => livro.toJSON());
  }

  get usuarios() {
    return this.#usuarios.map(usuario => usuario.toJSON());
  }

  get emprestimos() {
    return this.#emprestimos.map(emprestimo => emprestimo.toJSON());
  }


  getHistoricoEmprestimos(usuarioId) {
    const usuario = this.#usuarios.find(u => u.id === usuarioId);

    if (!usuario) {
      return 'Usuário não encontrado!';
    }

    const listaIdEmprestimos = usuario.historicoEmprestimos;
    let listaEmprestimos = [];
    listaEmprestimos = this.#emprestimos.filter(e => listaIdEmprestimos.includes(e.id));

    if (listaEmprestimos.length === 0) {
      return 'Este usuário ainda não possui emprestimos!';
    }
    return listaEmprestimos.map(emprestimo => emprestimo.toJSON());
  }
}

