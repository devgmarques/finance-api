# Documentação do Finance Api - Back-end

## Sumário
1. [Introdução](#1-introdução)
2. [Arquitetura do Projeto](#2-arquitetura-do-projeto)
   - [Princípios Seguidos](#21-princípios-seguidos)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Design do Código](#4-design-do-código)
   - [Use Cases](#41-use-cases)
   - [Testes Unitários](#42-testes-unitários)
5. [Como Executar o Projeto](#5-como-executar-o-projeto)
   - [Pré-requisitos](#51-pré-requisitos)
   - [Instalação](#52-instalação)
   - [Execução de Testes](#53-execução-de-testes)
6. [Rotas da API](#6-rotas-da-api)
   - [Usuário](#61-usuário)
   - [Transação](#62-transação)
7. [Erros Comuns](#7-erros-comuns)
8. [Considerações Finais](#8-considerações-finais)

## 1. **Introdução**
Este projeto é uma API financeira projetada para gerenciar transações. A API permite criar, visualizar, atualizar e excluir transações de forma segura, com autenticação baseada em tokens. A seguir, detalho as decisões técnicas, tecnologias utilizadas e o processo de desenvolvimento, destacando como as práticas de engenharia de software e padrões arquiteturais foram seguidos.

## 2. **Arquitetura do Projeto**
A estrutura do projeto segue a **Clean Architecture**, separando claramente as camadas de domínio, aplicação, infraestrutura e interfaces externas.

### 2.1 **Princípios Seguidos**
- **SOLID**: Aplicamos os cinco princípios para garantir a escalabilidade e manutenção do código.
- **KISS**: Mantivemos o código simples e fácil de entender.
- **DRY**: Evitamos repetição de lógica e código.
- **Clean Code**: Foco em legibilidade e simplicidade de compreensão.

## 3. **Tecnologias Utilizadas**
O projeto back-end foi desenvolvido utilizando as seguintes tecnologias:
- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **TypeScript**: Adotamos TypeScript para garantir tipagem estática e maior segurança durante o desenvolvimento.
- **Prisma**: Usado para a manipulação de banco de dados e mapeamento objeto-relacional (ORM).
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **Vitest**: Framework de testes utilizado para testes unitários.
- **Fastify**: Framework para criar a API RESTful.
- **Docker**: Utilizado para facilitar o setup do ambiente.

## 4. **Design do Código**
### 4.1 **Use Cases**
Implementamos os **casos de uso** seguindo os princípios da Clean Architecture. Os casos de uso são independentes de detalhes de infraestrutura, facilitando o teste e a manutenção. Cada caso de uso é testado com **testes unitários**, onde utilizamos **repositórios em memória** para simular interações com o banco de dados.

### 4.2 **Testes Unitários**
- Os testes unitários foram implementados utilizando **Vitest**. O padrão de testes **spy** foi usado para monitorar interações e garantir o funcionamento correto dos casos de uso.
- Os repositórios em memória permitiram que os testes fossem executados de forma independente do banco de dados, aumentando a velocidade e confiabilidade dos testes.

## 5. **Como Executar o Projeto**

### 5.1 **Pré-requisitos**
Certifique-se de ter instalado:
- Docker
- Node.js

Para a seção de **Instalação**, você já tem uma boa estrutura. Aqui está uma sugestão com ajustes para melhorar a clareza e fluxo:

---

### 5.2 **Instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/devgmarques/finance-api.git
   cd finance-api
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Configure o arquivo de ambiente:
   - Crie um arquivo `.env` com base no `.env.example` e preencha os valores necessários, como a URL do banco de dados e outras variáveis de configuração.

4. Suba o banco de dados PostgreSQL utilizando Docker:
   ```bash
   docker-compose up -d
   ```

5. Inicie a aplicação:
   ```bash
   npm run start:dev
   ```

### 5.3 **Execução de Testes**
Para rodar os testes unitários:
```bash
npm run test:watch
```

## 6. **Rotas da API**

A aplicação foi construída utilizando **Fastify** para gerenciar as rotas da API. Todas as rotas seguem o padrão RESTful, com endpoints organizados por recursos. A seguir, estão os principais endpoints expostos pela API:

Nota: Todas as rotas relacionadas a transações requerem autenticação. Para acessar essas rotas, é necessário fornecer um token JWT válido no cabeçalho da requisição.

### 6.1 **Usuário**
- **POST /users**
  **Descrição**: Criar um usuário.  
  **Corpo da Requisição**:
  ```json
  {
    "email": "email@email.com",
    "name": "name",
    "password": "password"
  }
  ```
  **Exemplo de Resposta**:
  ```json
  {
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNjljMGI2Ny03ZjljLTQ4YWYtYWU0Zi04NjdmZDY2MTM3NGUiLCJpYXQiOjE3Mjg1ODIzMjl9.nQmZkPve3aZuDKgru2FxKbhZLTvw5Y9L_FU-uHg9z44"
  }
  ```

- **POST /session**  
  **Descrição**: Logar um usuário. 
  **Corpo da Requisição**:
  ```json
  {
    "email": "email@email.com",
    "password": "password"
  }
  ``` 
  **Exemplo de Resposta**:
  ```json
  {
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNjljMGI2Ny03ZjljLTQ4YWYtYWU0Zi04NjdmZDY2MTM3NGUiLCJpYXQiOjE3Mjg1ODI0MTR9.-RCHa4ywAv78UDebDEFJYNscAP0d6zbLfYcQUTqtZuY"
  }
  ```

### 6.2 **Transação**
- **POST /transaction**  
  **Descrição**: Criar uma transação.  
  **Corpo da Requisição**:
  ```json
  {
    "category": "category_02",
    "title": "title",
    "value": 100,
    "type": "income",
    "createdAt": "2024-10-08T00:00:00Z" 
  }
  ```  
  **Exemplo de Resposta**:
  ```json
  {
    "transactionId": "a8b4de64-5003-454f-92e8-29d19e4de6ef",
    "title": "title",
    "value": 100,
    "type": "income",
    "category": "category_02",
    "userId": "069c0b67-7f9c-48af-ae4f-867fd661374e",
    "createdAt": "2024-10-08T00:00:00.000Z",
    "updatedAt": "2024-10-10T17:48:49.187Z"
  }
  ```



- **PUT /transactions/{transactionId}**  
  **Descrição**: Atualizar uma transação.  
  **Corpo da Requisição**:
  ```json
  {
    "category": "category_02",
    "title": "title",
    "type": "expense",
    "value": 100
  }
  ```  

  **Exemplo de Resposta**:
  ```json
  {
    "transactionId": "a8b4de64-5003-454f-92e8-29d19e4de6ef",
    "title": "title",
    "value": 100,
    "type": "income",
    "category": "category_02",
    "userId": "069c0b67-7f9c-48af-ae4f-867fd661374e",
    "createdAt": "2024-10-08T00:00:00.000Z",
    "updatedAt": "2024-10-10T17:48:49.187Z"
  }
  ```

- **GET /transactions?{type}**  
  **Descrição**: Listar todas as transações.  
  **Exemplo de Resposta**:
  ```json
  [
    {
        "transactionId": "a8b4de64-5003-454f-92e8-29d19e4de6ef",
        "title": "title",
        "value": 100,
        "type": "income",
        "category": "category_02",
        "userId": "069c0b67-7f9c-48af-ae4f-867fd661374e",
        "createdAt": "2024-10-08T00:00:00.000Z",
        "updatedAt": "2024-10-10T17:48:49.187Z"
    },
    {
        "transactionId": "612653dc-1698-4132-b0e4-3f7a43d33056",
        "title": "title",
        "value": 100,
        "type": "income",
        "category": "category_02",
        "userId": "069c0b67-7f9c-48af-ae4f-867fd661374e",
        "createdAt": "2024-10-08T00:00:00.000Z",
        "updatedAt": "2024-10-10T17:53:02.153Z"
    },
    {
        "transactionId": "ca574769-f5d6-41b7-87b5-2db2ed0bf1ca",
        "title": "title",
        "value": 100,
        "type": "expense",
        "category": "category",
        "userId": "069c0b67-7f9c-48af-ae4f-867fd661374e",
        "createdAt": "2024-10-08T00:00:00.000Z",
        "updatedAt": "2024-10-10T17:56:02.606Z"
    }
  ]
  ```


- **GET /transactions/summary**  
  **Descrição**: Pegar sumario todas as transações.  
  **Exemplo de Resposta**:
  ```json
  {
    "totalAmount": 300,
    "totalIncome": 200,
    "totalExpense": 100,
    "categoryBreakdown": {
        "category_02": {
            "income": 200,
            "expense": 0
        },
        "category": {
            "income": 0,
            "expense": 100
        }
    }
  }
  ```

- **DELETE /transactions/{transactionId}**  
  **Descrição**: Deletar transação.  

## 7. **Erros Comuns**
- **404 Not Found**: Retornado quando um recurso específico não é encontrado.
- **422 Unprocessable Entity**: Retornado quando o forjador tem a quantidade máxima de aneis permitidos.
- **500 Internal Server Error**: Quando ocorre algum erro inesperado no servidor.

## 8. **Considerações Finais**
O projeto foi desenvolvido seguindo os bons padrões de arquitetura e design de código, garantindo escalabilidade, facilidade de manutenção e testes robustos.

Feito por Guilherme Henrique Marques.