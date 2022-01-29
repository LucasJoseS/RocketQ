# RocketQ
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
Clone este repositório em sua máquina local.
```console
git clone https://github.com/LucasJoseS/NLW-Together-Discover
cd NLW-Together-Discover
```  

Instale as dependências do projeto e execute o arquivo run.sh.
```console
npm install --include=dev
./run.sh
```

## Banco de dados
Por padão o banco de dados utilizados é o sqlite, caso queira utilizar o
Postgressql será nescessário configurar uma váriavel de ambiente e modificar
alguns links simbólicos.
```console
export DATABASE_URL="postgres://[user]:[password]@[host]:[port]/[dbname]"
ln -f ./src/db/config.pg.js ./src/db/config.js
ln -f ./src/db/init.pg.js ./src/db/init.js
```

Realize a migração do branco de dados e inicie o servidor.
```console
npm run db-init
npm start
```
