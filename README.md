# Documentation - API 4CADIA Factory

A aplicação está dividida em duas camadas: model e controller. O model tem a responsabilidade de gerar e armazenar os dados, enquanto o controller carrega as regras de negócio. Os erros gerados na camada de controller são passados para o middleware de erro.

O banco de dados escolhido foi o MySQL, havendo relacionamento entre a tabela de usuários e a tabela de transações. Foi utilizado também o ORM Sequelize para diminuir a complexidade e facilitar a manutenção do código.

Por questões de segurança, as senhas persistidas no banco são criptografadas com o bcrypt.

Para a criação da API, utilizei o express. O express permite criar APIs robustas de forma fácil, sendo um dos frameworks mais populares que utiliza Node. Os recursos da API só podem ser acessados através do frontend especificado pelo cors.

A biblioteca joi faz a validação do input de dados dos endpoints e o jsonwebtoken gera tokens como resposta quando o usuário faz login e signup. Algumas rotas só podem ser acessadas se o token estiver presente no header da requisição.

<br/>

<br/>

## Available Scripts

No diretório do projeto, rode os seguintes comandos:

npm install - Instala as dependências
<br/>

Com o banco mysql rodando na máquina, configure o arquivo config.json dentro do diretório config com as credenciais do banco.
<br/>

![config](https://www.dropbox.com/s/am00v5kvijheh7h/config.png?raw=1)
<br/>

npx sequelize db:create - Cria o banco
<br/>

npx sequelize db:migrate - Cria as tabelas no banco
<br/>

node server.js - Inicia o servidor em http://localhost:3333

<br/>

## Codes

**200** - OK
<br/>

**201** - Created
<br/>

**400** - Bad Request
<br/>

**404** - Not Found
<br/>

**401** - Unauthorized
<br/>

**500** - Internal Server Error

<br/>

## Endpoints

***POST Create User***

localhost:3333/signup

Example Request

~~~
{
  "name" : "Bianca Caetano",
  "email" : "bianca@example.com"
  "password": "example"
}
~~~

Example Response

~~~
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cC..."
}
~~~

<br/>

***POST Login***

localhost:3333/login

Example Request

~~~
{
  "email" : "bianca@example.com"
  "password": "example"
}
~~~

Example Response

~~~
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cC..."
}
~~~

<br/>

***GET Get specific user***

localhost:3333/user

Example Request

~~~
"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cC..."
~~~

Example Response

~~~
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cC..."
}
~~~

<br/>

***POST Create Transaction***

localhost:3333/transaction

Example Request

~~~
"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cC..."
~~~

~~~
{
  "description": "example",
  "value": -200
}
~~~

Example Response

~~~
{
  "newBalance": 99799,
  "id": 1,
  "description": "example",
  "value": -200,
  "userId": 1,
  "createdAt": "2021-08-11T18:29:51.438Z"
}
~~~

<br/>

***GET Get transactions of a specific user***

localhost:3333/transaction

Example Request

~~~
"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cC..."
~~~

Example Response

~~~
[
  {
    "id": 1,
    "description": "example",
    "value": -200,
    "userId": 1,
    "createdAt": "2021-08-11T18:29:51.438Z"
  },
  {
    "id": 2,
    "description": "example",
    "value": -200,
    "userId": 1,
    "createdAt": "2021-08-11T18:30:51.438Z"
  },
  {
    "id": 3,
    "description": "example",
    "value": -200,
    "userId": 1,
    "createdAt": "2021-08-11T18:31:51.438Z"
  }
]
~~~
