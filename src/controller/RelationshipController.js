const AppError = require('../errors/error');

// Definição da classe RelationshipController
class RelationshipController {
  constructor() {
    this.relationships = []; // Array para armazenar os relacionamentos entre pessoas
    this.people = []; // Array para armazenar as pessoas cadastradas
  }

  // Método para definir as pessoas cadastradas
  setPeople(people) {
    this.people = people;
  }

  // Método para criar um relacionamento entre duas pessoas
  createRelationship(cpf1, cpf2) {
    // Procura as pessoas pelo CPF
    const person1 = this.people.find((person) => person.cpf === Number(cpf1));
    const person2 = this.people.find((person) => person.cpf === Number(cpf2));

    // Verifica se as pessoas foram encontradas
    if (!person1 || !person2) {
      throw new AppError('One or both users not found.', 404);
    }

    // Adiciona o relacionamento ao array de relacionamentos
    this.relationships.push({ cpf1, cpf2 });

    return 'Relationship created successfully.';
  }

  // Método para obter as recomendações de amigos para um usuário
  getRecommendations(userCpf) {
    // Verifica se o CPF é válido
    if (isNaN(userCpf)) {
      throw new AppError('CPF must contain 11 numeric digits.', 404);
    }

    // Procura a pessoa pelo CPF informado
    const person = this.people.find(({ cpf }) => cpf === Number(userCpf));

    // Verifica se a pessoa foi encontrada
    if (!person) {
      throw new AppError('User not found.', 404);
    }

    // Encontra os amigos dos amigos do usuário
    const friendOfFriends = this.findFriendOfFriends(userCpf);

    // Ordena as recomendações com base no número de amigos em comum
    const recommendations = Object.keys(friendOfFriends).sort(
      (a, b) => friendOfFriends[b] - friendOfFriends[a],
    );

    return recommendations;
  }

  // Método para encontrar os amigos dos amigos de um usuário
  findFriendOfFriends(userCpf) {
    const friendOfFriends = {}; // Objeto para armazenar os amigos dos amigos

    // Itera pelos relacionamentos
    for (const { cpf1, cpf2 } of this.relationships) {
      if (cpf1 === Number(userCpf)) {
        // Encontra o amigo do usuário
        const friend = this.people.find(({ cpf }) => cpf === Number(cpf2));

        if (friend) {
          // Verifica os relacionamentos do amigo do usuário
          for (const { cpf1, cpf2 } of this.relationships) {
            if (
              cpf1 === friend.cpf &&
              cpf2 !== Number(userCpf) &&
              !this.isDuplicateRelationship(userCpf, Number(cpf2))
            ) {
              // Encontra o amigo do amigo
              const friendOfFriend = this.people.find(
                ({ cpf }) => cpf === cpf2,
              );

              if (friendOfFriend) {
                // Conta o número de vezes que o amigo do amigo aparece nos relacionamentos
                friendOfFriends[friendOfFriend.cpf] =
                  (friendOfFriends[friendOfFriend.cpf] || 0) + 1;
              }
            }
          }
        }
      }
    }

    return friendOfFriends;
  }

  // Método para verificar se já existe um relacionamento duplicado entre o usuário e o amigo do amigo
  isDuplicateRelationship(userCpf, friendOfFriendCpf) {
    return this.relationships.some(
      ({ cpf1, cpf2 }) =>
        cpf1 === Number(userCpf) && cpf2 === friendOfFriendCpf,
    );
  }
}

// Exporta a classe RelationshipController para ser utilizada em outros arquivos
module.exports = RelationshipController;
