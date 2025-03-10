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
   cd backend/src/projetostack
    ```
## 2. Instale as dependências:

```bash
npm install
 ```
## 3. Configure o banco de dados no arquivo .env:

```bash
DATABASE_URL=postgresql://<usuario>:<senha>@localhost:5432/<nome-do-banco>?schema=public
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
cd /desafiofullstack
 ```

## 2. Instale as dependências:

```bash
npm install
 ```

Configure a URL da API no arquivo .env:

```bash
VITE_API_URL=http://localhost:5173
 ```
## 3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
 ```
## 4. Inicie o Docker:

```bash
docker compose up -d
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
backend/src/projetostack/
├── dist/                     # Arquivos compilados (JavaScript)
├── node_modules/             # Dependências do projeto (npm)
├── prisma/                   # Integração com o Prisma ORM
│   └── (conteúdo específico do Prisma)
├── src/                      # Código fonte da aplicação
│   ├── auth/                 # Lógica de autenticação (JWT)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── Dto/                  # Data Transfer Objects (DTOs)
│   │   └── (DTOs específicos)
│   │
│   ├── tasks/                # Lógica de tarefas (CRUD)
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   │
│   ├── users/                # Lógica de usuários (CRUD)
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── app.controller.spec.ts # Testes do controlador principal
│   ├── app.controller.ts      # Controlador principal
│   ├── app.module.ts          # Módulo principal
│   ├── app.service.ts         # Serviço principal
│   ├── main.ts                # Ponto de entrada
│   └── request.interface.ts   # Definições de interface para requisições
│
├── test/                     # Testes da aplicação
├── .env                      # Variáveis de ambiente
├── .gitignore                # Arquivos e pastas ignorados pelo Git
├── .prettierrc               # Configurações do Prettier
├── eslint.config.mjs          # Configurações do Eslint
├── nest-cli.json             # Configurações da CLI do NestJS
├── package-lock.json         # Gerenciado pelo npm (dependências fixas)
├── package.json              # Informações e dependências do projeto
├── README.md                 # Documentação do projeto
├── tsconfig.build.json       # Configurações do TypeScript para o build
└── tsconfig.json             # Configurações do TypeScript
 ```

Frontend
```bash
Claro, vamos analisar a estrutura de pastas e arquivos desse projeto, que parece ser um projeto React com TypeScript e Vite.

Estrutura Completa de Pastas e Arquivos:

src/
├── assets/             # Recursos estáticos (imagens, ícones, etc.)
├── components/         # Componentes reutilizáveis
├── context/            # Contextos do React para gerenciamento de estado global
├── hooks/              # Hooks personalizados
├── models/             # Definições de tipos e interfaces
├── pages/              # Páginas da aplicação
├── Utils/              # Funções utilitárias
├── App.css             # Estilos globais do componente App
├── App.tsx             # Componente App principal
├── index.css           # Estilos globais da aplicação
├── main.tsx            # Ponto de entrada da aplicação
├── vite-env.d.ts       # Definições de tipos para o Vite
├── .gitignore          # Arquivos e pastas ignorados pelo Git
├── eslint.config.js    # Configurações do ESLint
├── index.html          # Arquivo HTML principal
├── package-lock.json   # Gerenciado pelo npm (dependências fixas)
├── package.json        # Informações e dependências do projeto
├── README.md           # Documentação do projeto
├── rest.http           # Arquivo para testes de API com REST Client (VS Code)
├── tsconfig.app.json   # Configurações do TypeScript para a aplicação
├── tsconfig.json       # Configurações do TypeScript
├── tsconfig.node.json  # Configurações do TypeScript para o Node.js
└── vite.config.ts     # Configurações do Vite
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
