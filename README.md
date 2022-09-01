# Store Manager 📦

Consiste em uma API constrída para o gerenciamento de um e-commerce de produtos, com a possibilidade de criar, visualizar, deletar e atualizar produtos e vendas. 

* Contruída com Node.js, Express, MySQL e Docker
* Utilizando as práticas do REST
* Testes realizados com Mocha, Chai e Sinnon
* Aplicada Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores

## Variáveis de Ambiente

Para rodar esse projeto sem utilizar Docker, você vai precisar adicionar as 
seguintes variáveis de ambiente no seu .env

`MY_SQL_HOST`
`MY_SQL_USER`
`MY_SQL_PASSWORD`
`MY_SQL_DATABASE`
`PORT`


## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:guilherme-oliveira-trybe/Store-Manager-API-with-MSC-Architecture.git
```

Entre no diretório do projeto

```bash
  cd Store-Manager-API-with-MSC-Architecture
```

+ Utilizando Docker:
```bash
docker-compose up -d
docker exec -it store_manager bash
npm install
npm start
```

+ Rodando Localmente:

Necessário configurar as variáveis de ambiente conforme documentação antes
de rodar o projeto

```bash
  npm install
  npm start
```

### Endpoints

#### Produtos

| Método | URL |
|---|---|
| `GET` | http://localhost:3000/products |
| `GET` | http://localhost:3000/products/:id |
| `GET` | http://localhost:3000/products/search?q=name |
| `PUT` | http://localhost:3000/products/:id |
| `POST` | http://localhost:3000/products |
| `DELETE` | http://localhost:3000/products/:id |


Na requisição do PUT e POST, é necessário informar o seguinte JSON:

```
{ 
  "name": "Produto ABC"
}
```

#### Vendas

| Método | URL |
|---|---|
| `GET` | http://localhost:3000/sales |
| `GET` | http://localhost:3000/sales/:id |
| `PUT` | http://localhost:3000/sales/:id |
| `POST` | http://localhost:3000/sales |
| `DELETE` | http://localhost:3000/sales/:id |


Na requisição do PUT e POST, é necessário informar a quantidade e o id do produto no formato a seguir:

```
[
  {
    "productId": 1,
    "quantity": 2
  }, 
  { 
    "productId": 8,
    "quantity": 28
  }
]
```
