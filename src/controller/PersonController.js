const AppError = require('../errors/error');

// Definição da classe PersonController
class PersonController {
  constructor() {
    this.people = []; // Array para armazenar as pessoas cadastradas
  }

  // Método responsável por criar uma nova pessoa
  createPerson(cpf, name) {
    // Verifica se o CPF é válido
    if (!cpf || cpf.toString().length !== 11) {
      throw new AppError('CPF must contain exactly 11 numeric digits.', 400);
    }

    // Verifica se o CPF contém apenas dígitos numéricos
    if (isNaN(cpf)) {
      throw new AppError('CPF must contain 11 numeric digits.', 400);
    }

    // Verifica se a pessoa já está cadastrada
    if (this.people.find((person) => person.cpf === cpf)) {
      throw new AppError('User already exists.', 400);
    }

    // Cria um novo objeto pessoa com o CPF e nome informados
    const newPerson = { cpf, name };

    // Adiciona a nova pessoa ao array de pessoas
    this.people.push(newPerson);

    // Retorna o objeto pessoa criado
    return newPerson;
  }

  // Método responsável por obter os dados de uma pessoa pelo CPF
  getPerson(cpf) {
    // Procura a pessoa no array de pessoas pelo CPF
    const person = this.people.find((person) => person.cpf === Number(cpf));

    // Verifica se a pessoa foi encontrada
    if (!person) {
      throw new AppError('User not found.', 400);
    }

    // Retorna os dados da pessoa encontrada
    return person;
  }

  // Método responsável por limpar a lista de pessoas cadastradas
  cleanPeople() {
    this.people = []; // Limpa o array de pessoas
    return 'People cleaned successfully.'; // Retorna uma mensagem de sucesso
  }
}

// Exporta a classe PersonController para ser utilizada em outros arquivos
module.exports = PersonController;
