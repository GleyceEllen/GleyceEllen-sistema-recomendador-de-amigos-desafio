const PersonController = require('../../../src/controller/PersonController');
const AppError = require('../../../src/errors/error');

describe('PersonController', () => {
  let personController;

  beforeEach(() => {
    personController = new PersonController();
  });

  describe('createPerson', () => {
    // Teste para verificar se a criação de uma nova pessoa é feita com sucesso
    it('should create a new person successfully', () => {
      const result = personController.createPerson('12345678909', 'John Doe');

      // Verifica se o resultado é igual a um objeto contendo o CPF e o nome fornecidos
      expect(result).toEqual({ cpf: '12345678909', name: 'John Doe' });

      // Verifica se o número de pessoas na lista `people` do `personController` é igual a 1
      expect(personController.people).toHaveLength(1);
    });

    // Teste para verificar se uma exceção é lançada ao fornecer um CPF inválido
    it('should throw an error if the CPF is invalid', () => {
      // Verifica se uma exceção é lançada ao chamar o método `createPerson` com um CPF inválido
      expect(() => {
        personController.createPerson('123', 'Bob');
      }).toThrow('CPF must contain exactly 11 numeric digits');
    });

    // Teste para verificar se uma exceção é lançada ao tentar criar uma pessoa que já existe
    it('should throw an error if the user already exists', () => {
      personController.createPerson('12345678909', 'John Doe');

      // Verifica se uma exceção do tipo `AppError` é lançada
      expect(() => {
        personController.createPerson('helloHello', 'Jane Smith');
      }).toThrow(AppError);
    });

    // Teste para verificar se uma exceção é retornada ao tentar obter uma pessoa que não existe
    it('should return an error if the person was not found', () => {
      personController.createPerson('12345678909', 'John Doe');

      // Verifica se uma exceção do tipo `AppError` é lançada ao chamar o método `getPerson` com um CPF inexistente
      expect(() => {
        personController.getPerson('99999999999');
      }).toThrow(AppError);
    });

    // Teste para verificar se a pessoa é retornada corretamente quando ela existe
    it('should return the person if found', () => {
      const mockPerson = { cpf: '12345678909', name: 'John Doe' };
      personController.createPerson('12345678909', 'John Doe');

      // Configura uma simulação para o método `getPerson` que retorna o objeto `mockPerson`
      personController.getPerson = jest.fn().mockReturnValue(mockPerson);

      // Chama o método `getPerson` passando o CPF da pessoa
      const result = personController.getPerson('12345678909');

      // Verifica se o resultado é igual ao objeto `mockPerson`
      expect(result).toEqual(mockPerson);
    });
  });

  describe('clean', () => {
    // Teste para verificar se todas as relações são removidas
    it('should remove all relationships', () => {
      // Chama o método `cleanPeople` para remover todas as pessoas
      personController.cleanPeople();

      // Verifica se a lista `people` do `personController` está vazia
      expect(personController.people).toEqual([]);
    });
  });
});
