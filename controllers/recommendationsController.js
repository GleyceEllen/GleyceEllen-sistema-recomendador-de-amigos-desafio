const { Person } = require('../models');

// Obter recomendações de amigos
const getRecommendations = (req, res) => {
  const { cpf } = req.params;
  const person = Person.getByCPF(cpf);

  if (!person) {
    return res.status(404).json({ error: 'User not found' });
  }

  const recommendations = person.getFriendRecommendations();

  return res.json(recommendations);
};

module.exports = { getRecommendations };
