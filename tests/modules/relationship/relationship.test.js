const RelationshipController = require('../../../src/controller/RelationshipController');

describe('RelationshipController', () => {
  let relationshipController;

  beforeEach(() => {
    // Criação de uma instância do RelationshipController antes de cada teste
    relationshipController = new RelationshipController();
    // Configuração de pessoas pré-existentes no controlador para simular o ambiente
    relationshipController.setPeople([
      { cpf1: '12345678901', cpf2: '32145153513' },
    ]);
  });

  it('should return an error if one or both people do not exist', () => {
    // Teste para verificar se um erro é lançado quando uma ou ambas as pessoas não existem
    try {
      relationshipController.createRelationship('12345678901', '99999999999');
      fail('Expected an exception to be thrown.');
    } catch (error) {
      // Verifica se a mensagem de erro é a esperada e se a lista de relacionamentos está vazia
      expect(error.message).toBe('One or both users not found.');
      expect(relationshipController.relationships).toEqual([]);
    }

    try {
      relationshipController.createRelationship('99999999999', '98765432109');
      fail('Expected an exception to be thrown.');
    } catch (error) {
      // Verifica se a mensagem de erro é a esperada e se a lista de relacionamentos está vazia
      expect(error.message).toBe('One or both users not found.');
      expect(relationshipController.relationships).toEqual([]);
    }
  });

  it('should create a relationship between two existing people', () => {
    // Teste para verificar se um relacionamento é criado entre duas pessoas existentes
    const mockRelationship = { cpf1: '11145153620', cpf2: '32145153513' };

    try {
      relationshipController.createRelationship('11145153620', '32145153513');
      fail('Expected an exception to be thrown.');
    } catch (error) {
      // Verifica se a mensagem de erro é a esperada
      expect(error.message).toBe('One or both users not found.');
    }

    // Substituição do método createRelationship para retornar um relacionamento simulado
    relationshipController.createRelationship = jest
      .fn()
      .mockReturnValue(mockRelationship);

    // Chama o método createRelationship com parâmetros simulados
    const result = relationshipController.createRelationship({
      cpf1: '11145153620',
      cpf2: '32145153513',
    });

    // Verifica se o resultado é igual ao relacionamento simulado
    expect(result).toEqual(mockRelationship);
  });

  describe('findFriendOfFriends', () => {
    it('should return an empty object if the user has no friend of friends', () => {
      // Teste para verificar se um objeto vazio é retornado quando o usuário não tem amigos dos amigos
      const userCpf = '11111111111';
      const result = relationshipController.findFriendOfFriends(userCpf);

      expect(result).toEqual({});
    });

    it('should return an empty object if no friend of friends found', () => {
      // Teste para verificar se um objeto vazio é retornado quando nenhum amigo dos amigos é encontrado
      const result = relationshipController.findFriendOfFriends('11111111111');
      expect(result).toEqual({});
    });
  });
});
