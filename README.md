[PROJECT__BADGE]: https://img.shields.io/badge/🌐visite_nosso_site-000?style=for-the-badge&logo=project
[PROJECT__URL]: https://avanti-projeto-final.vercel.app/

<p align="center">
    <img src="./.github/assets/logo_findy.png" width="200px">
</p>

<h1 align="center">🔍 Findy - Conectando quem perdeu com quem encontrou</h1>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma_ORM-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![Material UI](https://img.shields.io/badge/material_ui-005CFE?style=for-the-badge&logo=mui&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

</br>
<p align="center">
    <img src="./.github/assets/image_site.png" width="100%">
</p>

## 📋 Descrição do Projeto

Findy é uma aplicação web comunitária desenvolvida para facilitar a recuperação de objetos perdidos em espaços públicos como escolas, parques, faculdades, entre outros.Com uma interface simples e intuitiva, qualquer pessoa pode cadastrar ou buscar itens perdidos e encontrados. Por meio de filtros por categoria, localização e status, além de uma barra de pesquisa por palavras-chave, o sistema torna mais fácil reconectar objetos aos seus verdadeiros donos.O projeto tem como objetivo incentivar a solidariedade e a organização em ambientes coletivos, utilizando a tecnologia como aliada.

[![project][PROJECT__BADGE]][PROJECT__URL]
---

## 🧱 Tecnologias Utilizadas

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Docker

### Frontend

- React.js
- Material UI
- Vite

### Deploy

- Vercel
  
## 🧩 Funcionalidades

### Usuário

- [x] Criar conta
- [x] Fazer login
- [x] Atualizar informações
- [x] Deletar conta(Somente ADMIN)
  
### Items

- [x] Cadastrar item
- [x] Ver todos items
- [x] Ver item
- [x] Editar item
- [x] Deletar item
- [x] Cadastrar imagem do item
- [x] Filtrar items por (nome, status, categoria)

### Categorias

- [x] Cadastrar categoria(Somente ADMIN)
- [x] Ver todas categorias
- [x] Ver categoria
- [x] Editar categoria(Somente ADMIN)
- [x] Deletar categoria(Somente ADMIN)

---

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente do Node.js
- Você instalou a versão mais recente do npm
- Você instalou a versão mais recente do Docker(Para utilizar PostgreSQL local)

## 🚀 Instalando o Findy

Para instalar o Findy, siga estas etapas:

Clone o repositório:
  
``` bash
git clone https://github.com/Vitorloula/Avanti-ProjetoFinal.git
```

Instalando o __backend__

1. Navegue até a pasta do projeto Avanti-ProjetoFinal vá em backend e instale as dependências:

    ```bash
    cd Avanti-ProjetoFinal
    cd backend
    npm install
    ```

2. Crie um arquivo `.env` para configurar as variáveis de ambiente:

    ```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
    PORT=3333
    JWT_SECRET="TOKEN_SECRET"
    ```

    Esses valores são exemplos de como você pode configurar suas variáveis de ambiente para a aplicação:

    __DATABASE_URL__: URL de conexão com o banco de dados PostgreSQL.(Se usar o banco pelo docker use a url do `.env.example`)

    __PORT__: Porta em que o servidor backend irá rodar. Pode ser alterada conforme a necessidade.

    __JWT_SECRET__: Chave secreta usada para assinar os tokens JWT.

3. Configure o banco de dados:

    Para iniciar o banco de dados utilize o seguinte comando:

    ```bash
    docker-compose up -d 
    ```

    Isso inicia o container do PostgreSQL.

</br>

> [!IMPORTANT]
> Caso use o banco de dados remoto e não o docker, as credenciais para conexão serão enviadas por e-mail na primeira entrega.

</br>

4. Iniciando o Prisma ORM e executando as migrations:

    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

    Obs: Se quiser só criar as tabelas no banco sem rodar uma nova migração use:

    ```bash
    npx prisma db push
    ```

5. Pronto agora você pode executar a api, utilize o comando:

   ```bash
   npm run dev 
   ```

   Caso tudo esteja configurado corretamente, o terminal deverá apresentar uma saída semelhante à imagem abaixo:

<center>
<img alt="Imagem do terminal executando a API" src=".github/assets/terminal-3.png"/>
</center>

</br>

Instalando o __frontend__

Após a instalação do backend, vamos iniciar a instalação do frontend, continue seguindo as etapas.

6. Navegando até o frontend e instalando:

   ```bash
    cd .. (Se ainda estiver na pasta backend)
    cd frontend
    npm install
    ```

</br>

> [!IMPORTANT]
> Caso use a API remota e não a local, as credenciais para conexão serão enviadas por e-mail na segunda entrega.

</br>

7. Crie um arquivo `.env` para configurar as variáveis de ambiente:

    ```bash
    VITE_API_URL=http://localhost:3333/api/v1/
    ```

    Esses valores são exemplos de como você pode configurar suas variáveis de ambiente para a aplicação:

    __VITE_API_URL__: URL da API que o front-end vai usar.

8. Pronto agora você pode executar, utilize o comando:

   ```bash
   npm run dev 
   ```

   Acesse na sua máquina a url: [http://localhost:5173](http://localhost:5173)



## 📚 Documentação com o Swagger

A API foi documentada utilizando o Swagger, permitindo a visualização de todas as rotas disponíveis, bem como a forma correta de utilizá-las.
Para acessar a documentação interativa, visite o seguinte endpoint:

🔗 [http://localhost:3333/api/v1/docs](http://localhost:3333/api/v1/docs)

<center>
<img alt="Imagem do Swagger" src=".github/assets/api-swagger-example.png" />
</center>

---

## 🤝 Colaboradores - Squad 6

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/Vitorloula" title="Vitor Loula (Vitorloula)">
        <img " src="https://avatars.githubusercontent.com/u/94725981?v=4" width="100px;"/><br>
        <sub>
          <b>Vitor Loula</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/EdiellyF" title="Edielly Ferreira (EdiellyF)">
        <img " src="https://avatars.githubusercontent.com/u/125711085?v=4" width="100px;" /><br>
        <sub>
          <b>Edielly Ferreira</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/joaoev" title="João Evangelista (joaoev)">
        <img src="https://avatars.githubusercontent.com/u/101232352?v=4" width="100px;" /><br>
        <sub>
          <b>João Evangelista</b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Eduardooh92" title="Eduardo Loureiro (Eduardooh92)">
        <img " src="https://avatars.githubusercontent.com/u/142263683?v=4" width="100px;"/><br>
        <sub>
          <b>Eduardo Loureiro</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JoabeValverde" title="Joabe Valverde (JoabeValverde)">
        <img " src="https://avatars.githubusercontent.com/u/141461975?v=4" width="100px;" /><br>
        <sub>
          <b>Joabe Valverde</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/nayane91moura" title="Nayane Moura (nayane91moura)">
        <img src="https://avatars.githubusercontent.com/u/204096926?v=4" width="100px;" /><br>
        <sub>
          <b>Nayane Moura</b>
        </sub>
      </a>
    </td>
  </tr>
  
</table>

<p align="center">
  Projeto desenvolvido durante o bootcamp Desenvolvimento Full Stack - Atlântico Avanti - Feito com 💜 por Squad 6  
</p>

