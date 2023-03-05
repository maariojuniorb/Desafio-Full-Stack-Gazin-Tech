# Desafio-Full-Stack-Gazin-Tech
Este é um desafio fullstack da GazinTech, onde foi proposta a criação de um backend e um frontend para gerenciamento ( CRUD ) de desenvolvedores e seus níveis.

## Requisitos

Para você rodar esse projeto você precisará ter as seguintes ferramentas instaladas:
- [Docker](https://docs.docker.com/engine/install/)
- [Docker-Compose](https://docs.docker.com/compose/install/)

## Como iniciar o projeto

Para iniciar o projeto, tanto quanto o frontend, backend e o banco de dados, basta rodar o comando:
```
docker-compose up -d --build
```

Depois de executado as aplicações vão estar disponíveis nas seguintes url:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Testes

Para rodar os testes, execute o seguinte comando no terminal:

```
docker-compose exec backend npm run test:integration
```

## Informações gerais

O Backend foi desenvolvido em typescript com nodejs, foi utilizado o framework express para contrução das apis, o sequelize como ORM da aplicação, e foi utilizado chai, mocha e sinon para contrução dos testes.

O Banco de dados escolhido foi o MYSQL.

O Frontend foi desenvolvido com React utilizando a biblioteca de interface Mantine e Axios para realização das requisições.

## Documentação API (Backend)

### GET `/developers` Retorna todos os desenvolvedores cadastrados
### GET `/developers/:id` Retorna um desenvolvedor pelo id
### GET `/developers/search?` Busca desenvolvedores baseado na query string
#### Query String
| name      | data type               |
|-----------|-------------------------|
| nivel     | string   |
| nome      | string   |
| sexo      | string   |
| dataNascimento      | string   |
| idade      | string   |
| hobby      | string   |

### POST `/developers` Cadastra um novo desenvolvedor
#### Parameters
| name      | data type               |
|-----------|-------------------------|
| nivel     | number   |
| nome      | string   |
| sexo      | string   |
| dataNascimento      | string (AAAA-MM-DD)   |
| idade      | number   |
| hobby      | string   |

### PUT `/developers/:id` Edita um desenvolvedor existente
#### Parameters
| name      | data type               |
|-----------|-------------------------|
| nivel     | number   |
| nome      | string   |
| sexo      | string   |
| dataNascimento      | string (AAAA-MM-DD)   |
| idade      | number   |
| hobby      | string   |

### DELETE `/developers/:id` Delete um desenvolvedor existente

### GET `/levels` Retorna todos os níveis cadastrados
### GET `/levels/:id` Retorna um nível pelo id
### GET `/leves/search?` Busca um nível baseado na query string
#### Query String
| name      | data type               |
|-----------|-------------------------|
| id        | string   |
| nivel     | string   |

### POST `/levels` Cadastra um novo nível
#### Parameters
| name      | data type               |
|-----------|-------------------------|
| nivel     | string   |

### PUT `/levels/:id` Edita um nível existente
#### Parameters
| name      | data type               |
|-----------|-------------------------|
| nivel     | string   |

### DELETE `/levels/:id` Delete um nível existente


