const { Person } = require('../models');

// Criar uma pessoa
const createPerson = (req, res) => {
  const { cpf, name } = req.body;

  if (!cpf || !name) {
    return res.status(400).json({ error: 'CPF and name are required' });
  }

  if (Person.exists(cpf)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const person = new Person(cpf, name);
  person.save();

  return res.sendStatus(200);
};

// Obter uma pessoa
const getPerson = (req, res) => {
  const { cpf } = req.params;
  const person = Person.getByCPF(cpf);

  if (!person) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(person);
};

module.exports = { createPerson, getPerson };
