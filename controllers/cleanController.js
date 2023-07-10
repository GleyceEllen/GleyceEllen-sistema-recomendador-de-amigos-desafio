const { Person } = require('../models');

// Limpar todos os dados
const cleanData = (req, res) => {
  Person.clear();

  return res.sendStatus(200);
};

module.exports = { cleanData };
