# Projeto de Gerenciamento de Tarefas

Este projeto é uma aplicação fullstack de gerenciamento de tarefas, utilizando **NestJS** no backend e **React** no frontend. O sistema permite que os usuários criem, leiam, atualizem e excluam tarefas, além de gerenciar a autenticação de usuários com **JWT**.

## Tecnologias Utilizadas

### Backend:
- **NestJS**: Framework para construção de APIs em Node.js.
- **Prisma ORM**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **JWT (JSON Web Token)**: Para autenticação e autorização de usuários.
- **Swagger**: Para a documentação da API.

### Frontend:
- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Build tool para aplicações React.
- **TailwindCSS**: Framework CSS para estilização.
- **Axios**: Para fazer requisições HTTP à API.

## Requisitos

- **Node.js** (versão 16 ou superior)
- **PostgreSQL** (ou um banco de dados compatível)
- **Docker** (opcional, caso queira rodar o PostgreSQL em contêiner)

## Instalação

### 1. Backend (NestJS)

1. Clone o repositório:
   ```bash
   git clone <URL-do-repositório>
   cd backend
    ```
## 2. Instale as dependências:

```bash
npm install
 ```
## 3. Configure o banco de dados no arquivo .env:

```bash
DATABASE_URL=postgresql://<usuario>:<senha>@localhost:5432/<nome-do-banco>?schema=public
JWT_SECRET=seu-segredo-aqui
 ```

## 4. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
 ```

## 5. Inicie o servidor:
```bash
npm run start:dev
 ```

### 2. Frontend (React)
Navegue até o diretório do frontend:

```bash
cd frontend
 ```

## 2. Instale as dependências:

```bash
npm install
 ```

Configure a URL da API no arquivo .env:

```bash
VITE_API_URL=http://localhost:3000
 ```
## 3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
 ```

### 3. Testando a Aplicação

## 1. Acesse o backend via Swagger:

A documentação da API estará disponível em: http://localhost:3000/api
Utilize o frontend via http://localhost:5173 para interagir com a aplicação.

Funcionalidades
Cadastro e login de usuários: Utiliza JWT para autenticação.
CRUD de tarefas: Permite criar, ler, atualizar e excluir tarefas.
Filtragem de tarefas: Tarefas podem ser filtradas por status.
Autenticação baseada em token: Os endpoints exigem um token de autenticação para acessar.
Estrutura do Projeto
Backend
```bash
src/
├── auth/            # Lógica de autenticação (JWT)
├── tasks/           # Lógica de tarefas (CRUD)
├── users/           # Lógica de usuários (CRUD)
├── prisma/          # Integração com o Prisma ORM
├── app.module.ts    # Módulo principal
└── main.ts          # Ponto de entrada
 ```

Frontend
```bash
src/
├── components/      # Componentes React
├── pages/           # Páginas da aplicação
├── services/        # Serviços para comunicação com a API
├── App.tsx          # Componente principal
└── index.tsx        # Ponto de entrada
 ```

Como Contribuir   
Fork o repositório.   
Crie uma branch para suas alterações (git checkout -b feature/nome-da-feature).   
Faça suas alterações e commit (git commit -am 'Adiciona nova funcionalidade').   
Envie para o repositório remoto (git push origin feature/nome-da-feature).   
Crie um Pull Request.   
Licença   
Este projeto está licenciado sob a MIT License.   

Esse modelo de README.md cobre o básico sobre o seu projeto e como executá-lo localmente. Caso precise de mais alguma coisa, fique à vontade para pedir!
