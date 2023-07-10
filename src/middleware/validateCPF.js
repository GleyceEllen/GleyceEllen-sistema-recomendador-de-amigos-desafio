const AppError = require('../errors/error');

// Função middleware responsável por validar o CPF
function validateCPF(req, res, next) {
  const { cpf } = req.body;

  if (!cpf || cpf.toString().length !== 11) {
    // Cria um novo erro com a mensagem adequada e o status code 400
    const error = new AppError('CPF must contain exactly 11 numeric digits.', 400);
    return next(error);
  }
// Se o CPF é válido, chama o próximo middleware
  next();
}
// Exporta a função para ser utilizada em outros arquivos
module.exports = validateCPF;
