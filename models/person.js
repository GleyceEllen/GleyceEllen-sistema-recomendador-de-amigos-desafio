let persons = [];

class Person {
  constructor(cpf, name) {
    this.cpf = cpf;
    this.name = name;
    this.friends = [];
  }

  save() {
    persons.push(this);
  }

  addFriend(person) {
    if (!this.isFriend(person)) {
      this.friends.push(person);
    }
  }

  isFriend(person) {
    return this.friends.includes(person);
  }

  getFriendRecommendations() {
    const recommendations = {};

    // Contar quantos amigos em comum os amigos têm
    for (const friend of this.friends) {
      for (const friendOfFriend of friend.friends) {
        if (friendOfFriend !== this && !this.isFriend(friendOfFriend)) {
          if (recommendations[friendOfFriend.cpf]) {
            recommendations[friendOfFriend.cpf]++;
          } else {
            recommendations[friendOfFriend.cpf] = 1;
          }
        }
      }
    }

    // Ordenar as recomendações pela quantidade de amigos em comum
    const sortedRecommendations = Object.entries(recommendations).sort(
      ([, countA], [, countB]) => countB - countA
    );

    return sortedRecommendations.map(([cpf]) => cpf);
  }

  static exists(cpf) {
    return persons.some((person) => person.cpf === cpf);
  }

  static getByCPF(cpf) {
    return persons.find((person) => person.cpf === cpf);
  }

  static clear() {
    persons = [];
  }
}

module.exports = Person;
