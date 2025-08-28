

export class Repository {

  constructor(storage = window.localStorage) {
    this.storage = storage;

    this.#ensureInit();
  }

  #ensureInit() {
    const autores = JSON.parse(this.storage.getItem('autores'));
    const usuarios = JSON.parse(this.storage.getItem('usuarios'));
    const livros = JSON.parse(this.storage.getItem('livros'));
    const emprestimos = JSON.parse(this.storage.getItem('emprestimos'));

    if (!Array.isArray(usuarios)) {
      this.storage.setItem('usuarios', JSON.stringify([]));
    }
    if (!Array.isArray(livros)) {
      this.storage.setItem('livros', JSON.stringify([]));
    }
    if (!Array.isArray(autores)) {
      this.storage.setItem('autores', JSON.stringify([]));
    }
    if (!Array.isArray(emprestimos)) {
      this.storage.setItem('emprestimos', JSON.stringify([]));
    }
  }

  listarUsuarios() {
    return JSON.parse(this.storage.getItem('usuarios'));
  }

  listarAutores() {
    return JSON.parse(this.storage.getItem('autores'));
  }

  listarLivros() {
    return JSON.parse(this.storage.getItem('livros'));
  }

  listarEmprestimos() {
    return JSON.parse(this.storage.getItem('emprestimos'));
  }


  salvarUsuario(usuario) {
    const usuarios = JSON.parse(this.storage.getItem('usuarios'));
    usuarios.push(usuario);
    this.storage.setItem('usuarios', JSON.stringify(usuarios));
  }

  salvarLivro(livro) {
    const livros = JSON.parse(this.storage.getItem('livros'));
    livros.push(livro);
    this.storage.setItem('livros', JSON.stringify(livros));
  }

  salvarAutor(autor) {
    const autores = JSON.parse(this.storage.getItem('autores'));
    autores.push(autor);
    this.storage.setItem('autores', JSON.stringify(autores));
  }

  salvarEmprestimo(emprestimo) {
    const emprestimos = JSON.parse(this.storage.getItem('emprestimos'));
    emprestimos.push(emprestimo);
    this.storage.setItem('emprestimos', JSON.stringify(emprestimos));
  }

  atualizarEmprestimos(emprestimos) {
    this.storage.setItem('emprestimos', JSON.stringify(emprestimos));
  }

  atualizarUsuarios(usuarios) {
    this.storage.setItem('usuarios', JSON.stringify(usuarios));
  } 

  atualizarLivros(livros) {
    this.storage.setItem('livros', JSON.stringify(livros));
  }
  
  atualizarAutores(autores) {
    this.storage.setItem('autores', JSON.stringify(autores));
  }
}