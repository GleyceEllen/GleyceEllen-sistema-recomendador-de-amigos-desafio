PROJETO RECOMENDADOR DE AMIGOS

Este é um projeto de um sistema de recomendação de amigos desenvolvido em Node.js. O sistema permite cadastrar pessoas, criar relacionamentos entre elas e obter recomendações de novos amigos com base nas amizades existentes.


Funcionalidades:

O projeto implementa as seguintes rotas:

Create Person - [POST] http://localhost:3000/person

Esta rota recebe um CPF e um nome e realiza o cadastro do usuário. Retorna erro com status code 400 caso o usuário já esteja cadastrado ou o CPF informado não tenha 11 dígitos numéricos.


Get Person - [GET] http://localhost:3000/person/:CPF

Esta rota recebe um CPF e, se o usuário existir, retorna seus dados (nome e CPF), caso contrário, retorna erro com status code 404.


Clean - [DELETE] http://localhost:3000/clean

Esta rota limpa todos os dados (pessoas e relacionamentos) em memória.


Create Relationship - [POST] http://localhost:3000/relationship

Esta rota recebe dois CPFs e, caso os dois usuários existam, cria um relacionamento entre eles, caso contrário, retorna erro com status code 404.


Get Recommendations - [GET] http://localhost:3000/recommendations/:CPF

Esta rota recebe um CPF e retorna uma lista de CPFs dos amigos dos amigos do usuário informado que não são seus amigos, ordenada de maneira decrescente pela relevância. A relevância é determinada pela quantidade de amigos em comum que cada amigo dos amigos possui. Apenas amigos dos amigos são listados e casos em que a pontuação é zero são ignorados.


Pré-requisitos:
Node.js instalado (versão 10 ou superior)
Instalação
Clone o repositório:

GIT CLONE:

git clone <URL do repositório>
Navegue até o diretório do projeto:

cd recomendador-de-amigos

Instale as dependências:

npm install

Inicie o servidor:

npm start

*O servidor será iniciado e estará escutando na porta 3000.*

Faça as requisições às rotas utilizando uma ferramenta de teste de API, como cURL ou Postman.

Testes
O projeto inclui testes automatizados para garantir o funcionamento correto das rotas. Eles foram implementados usando o framework Jest. Para executar os testes, utilize o seguinte comando:

npm test
Os testes podem ser encontrados no diretório tests.
