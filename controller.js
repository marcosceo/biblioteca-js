import { Biblioteca } from "./biblioteca.js";
import { Repository } from "./repository.js";


export class Controller {
  constructor(doc = document, biblioteca = new Biblioteca(), repo = new Repository()) {
    this.doc = doc;
    this.biblioteca = biblioteca;
    this.repo = repo;

    //Autor
    this.autorNome = doc.querySelector('#autor-nome');
    this.autorNacionalidade = doc.querySelector('#autor-nacionalidade');
    this.autorAnoNascimento = doc.querySelector('#autor-ano-nascimento');

    //Livro
    this.livroTitulo = doc.querySelector('#livro-titulo');
    this.livroAutor = doc.querySelector('#livro-autor');
    this.livroAnoPublicacao = doc.querySelector('#livro-ano-publicacao');
    this.livroGenero = doc.querySelector('#livro-genero');

    //Usuário
    this.usuarioNome = doc.querySelector('#usuario-nome');
    this.usuarioTipo = doc.querySelector('#usuario-tipo');

    //Emprestimo
    this.emprestimoLivroId = doc.querySelector('#emprestimo-livro');
    this.emprestimoUsuarioId = doc.querySelector('#emprestimo-usuario');

    this.listaUsuarios = doc.querySelector('#lista-usuarios');
    this.listaUsuariosOption = doc.querySelector('#emprestimo-usuario');
    this.listaAutores = doc.querySelector('#lista-autores');
    this.listaAutoresOption = doc.querySelector('#livro-autor');
    this.listaLivros = doc.querySelector('#lista-livros');
    this.listaLivrosOption = doc.querySelector('#emprestimo-livro');
    this.listaEmprestimos = doc.querySelector('#lista-emprestimos');

    this.init();
    this.renderUsuarios();
    this.renderAutores();
    this.renderLivros();
    this.renderEmprestimos();
  }

  init() {
    this.doc.getElementById("form-autor").addEventListener("submit", (event) => {
      event.preventDefault();
      const nome = this.autorNome.value;
      const nacionalidade = this.autorNacionalidade.value;
      const anoNascimento = this.autorAnoNascimento.value;
      this.biblioteca.adicionarAutor(nome, nacionalidade, anoNascimento);
      this.renderAutores();
      this.autorNome.value = '';
      this.autorNacionalidade.value = '';
      this.autorAnoNascimento.value = '';
    });

    this.doc.getElementById("form-livro").addEventListener("submit", (event) => {
      event.preventDefault();
      const titulo = this.livroTitulo.value;
      const autor = this.livroAutor.value;
      const anoPublicacao = this.livroAnoPublicacao.value;
      const genero = this.livroGenero.value;
      this.biblioteca.adicionarLivro(titulo, autor, anoPublicacao, genero);
      this.renderLivros();
      this.livroTitulo.value = '';
      this.livroAutor.value = '';
      this.livroAnoPublicacao.value = '';
      this.livroGenero.value = '';
    });

    this.doc.getElementById("form-usuario").addEventListener("submit", (event) => {
      event.preventDefault();
      const nome = this.usuarioNome.value;
      const tipoUsuario = this.usuarioTipo.value;
      this.biblioteca.adicionarUsuario(nome, tipoUsuario);
      this.renderUsuarios();  
      this.usuarioNome.value = '';
      this.usuarioTipo.value = 'estudante';
    });

    this.doc.getElementById("form-emprestimo").addEventListener("submit", (event) => {
      event.preventDefault();
      const livroId = this.emprestimoLivroId.value;
      const usuarioId = this.emprestimoUsuarioId.value;
      this.biblioteca.realizarEmprestimo(livroId, usuarioId);
      this.renderEmprestimos();  
      this.emprestimoLivroId.value = '';
      this.emprestimoUsuarioId.value = '';
    });

    this.listaUsuarios.addEventListener('click', (event) => {
      if (event.target.classList.contains('botao-excluir-usuario')) {
        event.preventDefault();
        const usuarioId = event.target.closest('tr[data-id]').getAttribute('data-id');
        this.biblioteca.excluirUsuario(usuarioId);
        this.renderUsuarios();
      }
    });

    this.listaAutores.addEventListener('click', (event) => {
      if (event.target.classList.contains('botao-excluir-autor')) {
        event.preventDefault();
        const autorId = event.target.closest('tr[data-id]').getAttribute('data-id');
        this.biblioteca.excluirAutor(autorId);
        this.renderAutores();
      }
    });

    this.listaLivros.addEventListener('click', (event) => {
      if (event.target.classList.contains('botao-excluir-livro')) {
        event.preventDefault();
        const livroId = event.target.closest('tr[data-id]').getAttribute('data-id');
        this.biblioteca.excluirLivro(livroId);
        this.renderLivros();
      }
    });

    this.listaEmprestimos.addEventListener('click', (event) => {
      if (event.target.classList.contains('botao-devolver')) {
        event.preventDefault();
        const emprestimoId = event.target.closest('tr[data-id]').getAttribute('data-id');
        this.biblioteca.registrarDevolucao(emprestimoId);
        this.renderEmprestimos();
      }
    });
  };

  renderUsuarios() {
    
    const usuarios = this.biblioteca.usuarios;
    this.listaUsuarios.innerHTML = usuarios.map(u =>`
        <tr data-id="${u.id}" class="hover:bg-gray-50 transition duration-150">
            <td class="py-3 px-4 border-b text-sm">${u.nome}</td>
            <td class="py-3 px-4 border-b text-sm">${u.tipo.charAt(0).toUpperCase() + u.tipo.slice(1)}</td>
            <td class="py-3 px-4 border-b text-sm">
              <!--  <button class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md text-xs mr-2 transition duration-200">Editar</button> -->
                <button class="botao-excluir-usuario bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs transition duration-200">Excluir</button>
            </td>
        </tr>
      `).join('');  

      this.listaUsuariosOption.innerHTML = usuarios.map(u =>`
          <option value="${u.id}">${u.nome}</option>
        `).join('');

      this.listaUsuariosOption.innerHTML = '<option value="">Selecione um Usuário</option>' + this.listaUsuariosOption.innerHTML;
  }

  renderAutores() {
    const autores = this.biblioteca.autores;
    this.listaAutores.innerHTML = autores.map(a =>`
        <tr data-id="${a.id}" class="hover:bg-gray-50 transition duration-150">
            <td class="py-3 px-4 border-b text-sm">${a.nome}</td>
            <td class="py-3 px-4 border-b text-sm">${a.nacionalidade.charAt(0).toUpperCase() + a.nacionalidade.slice(1)}</td>
            <td class="py-3 px-4 border-b text-sm">${a.anoNascimento}</td>
            <td class="py-3 px-4 border-b text-sm">
              <!--  <button class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md text-xs mr-2 transition duration-200">Editar</button> -->
                <button class="botao-excluir-autor bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs transition duration-200">Excluir</button>
            </td>
        </tr>
      `).join('');

      this.listaAutoresOption.innerHTML = autores.map(a =>`
        <option value="${a.id}">${a.nome}</option>
        `)
        
      this.listaAutoresOption.innerHTML = '<option value="">Selecione um Autor</option>' + this.listaAutoresOption.innerHTML;

  }

  renderLivros() {
    const livros = this.biblioteca.livros;
    this.listaLivros.innerHTML = livros.map(l =>`
        <tr data-id="${l.id}" class="hover:bg-gray-50 transition duration-150">
            <td class="py-3 px-4 border-b text-sm">${l.titulo}</td>
            <td class="py-3 px-4 border-b text-sm">${l.autor}</td>
            <td class="py-3 px-4 border-b text-sm">${l.anoPublicacao}</td>
            <td class="py-3 px-4 border-b text-sm">${l.genero.charAt(0).toUpperCase() + l.genero.slice(1)}</td>
            <td class="py-3 px-4 border-b text-sm">
              <!--  <button class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md text-xs mr-2 transition duration-200">Editar</button> -->
                <button class="botao-excluir-livro bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs transition duration-200">Excluir</button>
            </td>
        </tr>
      `).join('');

      this.listaLivrosOption.innerHTML = livros.map(l =>`
          <option value="${l.id}">${l.titulo}</option>
        `).join('');

      this.listaLivrosOption.innerHTML = '<option value="">Selecione um Livro</option>' + this.listaLivrosOption.innerHTML;
  }

  renderEmprestimos() {
    const emprestimos = this.biblioteca.listarEmprestimosAtivos();
    if(emprestimos === 'Não há empréstimos ativos!') {
      this.listaEmprestimos.innerHTML = `
        <td colspan="4" class="text-center py-3 px-4 border-b text-sm">Não há emprestimos ativos!<td>
      `;    
    } else{
      this.listaEmprestimos.innerHTML = emprestimos.map(e =>`
        <tr data-id="${e.id}" class="hover:bg-gray-50 transition duration-150">
            <td class="py-3 px-4 border-b text-sm">${e.livro}</td>
            <td class="py-3 px-4 border-b text-sm">${e.usuario}</td>
            <td class="py-3 px-4 border-b text-sm">${e.dataEmprestimo.toLocaleDateString()}</td>
            <td class="py-3 px-4 border-b text-sm">
                <button class="botao-devolver bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs transition duration-200">Devolver</button>
            </td>
        </tr>
      `).join('');
    }
    
  }
}
