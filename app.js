const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/person', routes.person);
app.use('/relationship', routes.relationship);
app.use('/recommendations', routes.recommendations);
app.use('/clean', routes.clean);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
