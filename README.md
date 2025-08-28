# 📚 Sistema de Gerenciamento de Biblioteca

Uma aplicação web para gerenciamento de uma pequena biblioteca, construída com HTML, JavaScript puro (ES Modules) e estilizada com Tailwind CSS. Os dados são persistidos localmente no navegador usando `localStorage`.

## 📖 Descrição

Este projeto é um sistema front-end que simula as operações básicas de uma biblioteca. Ele permite o cadastro de autores, livros e usuários (alunos/professores), além do controle de empréstimos e devoluções. A interface é reativa, atualizando as listas e opções dinamicamente após cada operação, sem a necessidade de recarregar a página.

## ✨ Funcionalidades

-   **Gerenciamento de Autores:**
    -   Adicionar e excluir autores.
    -   Listagem de todos os autores cadastrados.
-   **Gerenciamento de Livros:**
    -   Adicionar e excluir livros, associando-os a um autor existente.
    -   Listagem de todos os livros.
-   **Gerenciamento de Usuários:**
    -   Adicionar e excluir usuários (com tipos "aluno" ou "professor").
    -   Listagem de todos os usuários.
-   **Gerenciamento de Empréstimos:**
    -   Realizar empréstimos de livros para usuários.
    -   Registrar a devolução de um livro.
    -   Listagem de todos os empréstimos ativos.
-   **Persistência de Dados:**
    -   Todas as informações são salvas no `localStorage` do navegador, mantendo o estado da aplicação entre as sessões.

## 🚀 Tecnologias Utilizadas

-   **HTML5:** Estrutura da aplicação.
-   **Tailwind CSS:** Framework de estilização.
-   **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM e interatividade.
    -   **Módulos ES:** Para uma arquitetura de código organizada e modular.
-   **LocalStorage API:** Para persistência de dados no lado do cliente.

## ⚙️ Como Executar

Como este projeto utiliza Módulos ES (`"type": "module"` no `package.json`), ele precisa ser servido por um servidor web local para funcionar corretamente, devido às políticas de segurança (CORS) dos navegadores ao carregar módulos do sistema de arquivos.

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd biblioteca
    ```

2.  **Inicie um servidor local:**
    A maneira mais fácil é usar uma extensão como o **Live Server** no Visual Studio Code.

    Alternativamente, você pode usar um servidor via linha de comando:

    -   **Se você tiver o Node.js:**
        ```bash
        # Instale o live-server globalmente (se ainda não tiver)
        npm install -g live-server

        # Inicie o servidor no diretório do projeto
        live-server
        ```

    -   **Se você tiver o Python 3:**
        ```bash
        python -m http.server
        ```

3.  **Abra no navegador:**
    Acesse o endereço fornecido pelo servidor (geralmente `http://127.0.0.1:8080` ou `http://localhost:8000`).

## 📂 Estrutura do Projeto

```
/
├── index.html          # Arquivo principal da interface do usuário
├── controller.js       # Controla a interação entre a UI e a lógica de negócio (View-Controller)
├── biblioteca.js       # Contém a lógica de negócio e o estado da aplicação (Model)
├── repository.js       # Camada de abstração para persistência de dados no localStorage
├── autor.js            # Classe do modelo de dados para Autor
├── livro.js            # Classe do modelo de dados para Livro
├── usuarioAluno.js     # Classe do modelo de dados para Usuário Aluno
├── usuarioProfessor.js # Classe do modelo de dados para Usuário Professor
├── emprestimo.js       # Classe do modelo de dados para Empréstimo
└── package.json        # Metadados do projeto e configuração de Módulos ES
```

O projeto segue uma arquitetura que se aproxima do padrão MVC (Model-View-Controller), onde:
-   **Model:** Representado pela classe `Biblioteca` e as classes de domínio (`Livro`, `Autor`, etc.), que contêm a lógica de negócio e os dados.
-   **View:** É o `index.html` e a parte de renderização dentro do `controller.js`.
-   **Controller:** É a lógica principal dentro do `controller.js` que ouve os eventos da View e aciona as atualizações no Model.