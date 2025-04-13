# 🔍 Findy - Conectando quem perdeu com quem encontrou

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma_ORM-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## 📋 Descrição do Projeto

Findy é uma aplicação web comunitária desenvolvida para facilitar a recuperação de objetos perdidos em espaços públicos como escolas, parques, faculdades, entre outros.Com uma interface simples e intuitiva, qualquer pessoa pode cadastrar ou buscar itens perdidos e encontrados. Por meio de filtros por categoria, localização e status, além de uma barra de pesquisa por palavras-chave, o sistema torna mais fácil reconectar objetos aos seus verdadeiros donos.O projeto tem como objetivo incentivar a solidariedade e a organização em ambientes coletivos, utilizando a tecnologia como aliada.

---

> [!NOTE]
> Ainda vai ser implementado funcionalidades quando o front-end for iniciado, como cadastro de imagens e filtros personalizados.

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
- [ ] Cadastrar imagem do item
- [ ] Filtrar items por (nome, status, categoria, local, data, usuário)

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

1. Navegue até a pasta backend e instale as dependências:

    ```bash
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

    > [!IMPORTANT]
    > Caso use o banco de dados remoto e não o docker, as credenciais para conexão serão enviadas por email na primeira entrega.

4. Iniciando o Prisma client:

    ```bash
    npx prisma generate
    ```

5. Pronto agora você pode executar a api, utilize o comando:

   ```bash
   npm run dev 
   ```

   Caso tudo esteja configurado corretamente, o terminal deverá apresentar uma saída semelhante à imagem abaixo:

<center>
<img alt="Imagem do terminal executando a API" src=".github/assets/terminal-example.svg" width="50%"/>
</center>

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

<table>
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
