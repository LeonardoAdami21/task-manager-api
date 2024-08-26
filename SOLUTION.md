# Task Manager Api

Gerenciador de tarefas com autenticação e autorização de para os usuarios possam criar, deleter, atualizar e ver suas tarefas.

## Tecnologias utilizas:

As seguintes tecnologias foram utilizas para ter melhor desempenho na realização da interface web:

- Nest.js: como framework do backend [text](https://docs.nestjs.com/)
- Arquitetura: Alguns conhecitos da aqruitetura SOLID, so a interface 
- Prisma Orm: é um ORM Node.js e TypeScript de última geração que abre um novo nível de experiência do desenvolvedor ao trabalhar com bancos de dados graças ao seu modelo de dados intuitivo, migrações automatizadas, segurança de tipo e preenchimento automático.
[text](https://www.prisma.io/?via=start&gad_source=1)
- Autenticação e Autorização:  utilizando JWT (JSON Web Token). Apenas usuários autenticados devem ter acesso às funcionalidades de gerenciamento de tarefas.
- @Nestjs/Swagger: para simplificar o desenvolvimento de APIs com nossas ferramentas profissionais e de código aberto, desenvolvidas para ajudar você e sua equipe a projetar e documentar APIs em escala com eficiência.
- Banco de  dados: utilizado o neon para faciliar a comunicação com o prisma orm:  [text](https://neon.tech/)

## Como utilizar: 
- Primeiro: baixar o projeto do repositorio github: [text](https://github.com/LeonardoAdami21/task-manager-api)
- Segundo: instalar as dependencias do projeto utilizando os comandos no terminal : 
### `yarn ou npm i`
- Terceiro: Seguir a mesma variavel de ambiente que esta no .env.example e criar o .env colocando a porta do backend nela
- Quarto rodar os seguintes comandos para iniciar a comunicação com prisma e neon

Inicialização:
### `yarn prisma init ou npm run prisma init`

Criar as migrações:
### `yarn prisma migrate dev ou npm rum migrate dev`

- Quinto: rodar a aplicação web usando:
### `yarn start ou npm run start`

- Sexto: para acessar o swagger é so clicar no link que ira aparecer no terminal quando: [text](http://localhost:3000/api)

- Sextimo(Opcional): para utilizar com postman no link acima [text](http://localhost:3000/api) sem seu navegador de preferencia de um - com o json[text](http://localhost:3000/api-json) ira aparcer um json com todos os dados(JSON) contro + c + control + v;
- Pegue estes dados em formato de json va no postman procure por Import, jogue estes dados dentro que o proprio postman.
- Nisso so vai faltar a url para colocar, porque ela vem vazia e so ir no proprio projeto e procurar por variables e colocar a url [text](http://localhost:3000/api-json) como valor inicial, e agora podera utilizar ela com postman.