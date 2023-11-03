<p align="center">
  <h1 align="center" >Desafio 02: Daily Diet API</<h1>
</p>


## Funcionalidades

Este projeto consiste em uma API REST em Node.js para gerenciar sua dieta. Com esta aplicação, você pode cadastrar novas refeições, excluir refeições existentes e visualizar métricas importantes para sua dieta, como quantidades totais de alimentos dentro e fora da dieta.

## Rotas

* `POST - /daily/register/`

  Criar um novo usuario, recebendo no body da requisição `email` e `password`

* `POST - /daily/login/`

  Fazer um novo login, recebendo no body da requisição `email` e `password`

* `GET - /daily/snacks/`

  Listar todos os registros de dietas no banco de dados.

* `POST - /daily/snacks/`

  Criar uma nova refeição, recebendo no body da requisição `name`, `description` e `isInDiet`.
 
* `GET - /daily/:id`

  Listar apenas uma dieta especificas no banco de dados.

* `DELETE - /daily/:id`

  Deletar apenas uma dieta especificas no banco de dados.

* `PUT - /daily/:id`

  Alterar dados de  apenas uma dieta especificas no banco de dados.

* `GET - /daily/summary`

  Mostar metricas como quantidade total de refeições registradas, quantidade total dentro da dieta.

## Regras da aplicação

- [x] Deve ser possível criar um usuário.
- [x] Deve ser possível identificar o usuário entre as requisições.
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e hora
  - Está dentro ou não da dieta

- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima.
- [x] Deve ser possível apagar uma refeição.
- [x] Deve ser possível listar todas as refeições de um usuário.
- [x] Deve ser possível visualizar uma única refeição.
- [ ] Deve ser possível recuperar as métricas de um usuário.
  - [x] Quantidade total de refeições registradas.
  - [x] Quantidade total de refeições dentro da dieta.
  - [x] Quantidade total de refeições fora da dieta.
  - [ ] Melhor sequência por dia de refeições dentro da dieta.
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou.


## :hammer_and_wrench: Tecnologias

* **Node.Js**
* **Typescript**
* **Zod**
* **Fastify**
  * @fastify/cookie
* **Eslint**
* **Vitest**
* **Supertest**
* **Tsx**
* **Sqlit 3** para ambiente de desenvolvimento.

## 👷 Requisitos

```bash
# Clone repository

$ git clone https://github.com/franciniltonsoaresmenzes/daily-diet-api-rest.git

# Go to server folder

$ cd daily-diet-api-rest
# Install Dependencies

$ npm i

# Rename file .env.example to .env

# Rename file .env.test.example to .env.test

# Run script Knex

$ npm run knex -- migrate:latest

# Run aplication

$ npm run dev

# Access localhost
# http://localhost:3333
```