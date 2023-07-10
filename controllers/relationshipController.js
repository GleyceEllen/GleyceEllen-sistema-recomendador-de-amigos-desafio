const { Person } = require('../models');

// Criar um relacionamento entre duas pessoas
const createRelationship = (req, res) => {
  const { cpf1, cpf2 } = req.body;
  const person1 = Person.getByCPF(cpf1);
  const person2 = Person.getByCPF(cpf2);

  if (!person1 || !person2) {
    return res.status(404).json({ error: 'User not found' });
  }

  person1.addFriend(person2);
  person2.addFriend(person1);

  return res.sendStatus(200);
};

module.exports = { createRelationship };
