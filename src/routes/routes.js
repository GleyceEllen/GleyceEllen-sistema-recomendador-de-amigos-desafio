const express = require('express');

// Criação de uma instância do roteador do Express
const router = express.Router();

// Importação dos controladores para manipular as requisições
const PersonController = require('../controller/PersonController');
const RelationshipController = require('../controller/RelationshipController');

// Criação de instâncias dos controladores
const personController = new PersonController();
const relationshipController = new RelationshipController();

// Importação do middleware para validação de CPF
const validateCPF = require('../middleware/validateCPF');

// Utilização do middleware global para fazer o parse do corpo das requisições como JSON
router.use(express.json());

// Rota para criar uma pessoa
router.post('/person', validateCPF, (req, res) => {
  const { cpf, name } = req.body;
  const result = personController.createPerson(cpf, name);
  res.status(result.error ? 400 : 200).send(result);
});

// Rota para obter os dados de uma pessoa pelo CPF
router.get('/person/:cpf', (req, res) => {
  const { cpf } = req.params;
  const person = personController.getPerson(cpf);
  res.status(person.error ? 404 : 200).json(person);
});

// Rota para limpar os dados das pessoas
router.delete('/clean', (req, res) => {
  const result = personController.cleanPeople();
  res.status(200).send(result);
});

// Rota para criar um relacionamento entre duas pessoas
router.post('/relationship', (req, res) => {
  const { cpf1, cpf2 } = req.body;
  relationshipController.setPeople(personController.people);
  const result = relationshipController.createRelationship(cpf1, cpf2);
  res.status(result.error ? 400 : 200).json(result);
});

// Rota para obter recomendações de amizades para uma pessoa
router.get('/recommendations/:cpf', validateCPF, (req, res) => {
  const { cpf } = req.params;
  relationshipController.setPeople(personController.people);
  const recommendations = relationshipController.getRecommendations(cpf);
  res.status(recommendations.error ? 400 : 200).json(recommendations);
});

// Exportação do roteador para ser utilizado pela aplicação
module.exports = router;
