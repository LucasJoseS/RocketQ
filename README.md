## RocketQ

## Projeto
Este é um projeto desenvolvido durante a Next Level Week, 6ª edição (Together), missão Discover

## Tecnologias
- JavaScript
- HTML
- CSS
- NodeJs
- EJS
- Express
- SQLite

## Executando
### Dependências
Instale todas as dependências do projeto utilizando `npm install`

### Configuração
Todas as configurações são opcionais

#### Porta
A porta utilizada por padrão é a 5000 porém pode ser redefinida com a váriável de ambiente `PORT`

#### Banco de dados
O banco padão utilizado é o sqlite porém tambem á o suporte ao banco postgres definindo a variável  
de ambiente `DATABASE_DRIVER = "postgres"` e `DATABASE_URL = "postgres://[user]:[password]@[host]:[port]/[dbname]"`

### Execução
Utilize o commando `npm run db-migrate` para realizar a migração do banco de dados e `npm start` para iniciar a aplicação.

### Heroku
Para acessar o site publicado no heroku [Clique aqui](https://young-stream-36865.herokuapp.com/)
