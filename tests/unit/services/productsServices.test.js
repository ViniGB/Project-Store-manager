const { expect } = require('chai');

const productsService = require('../../../services/productsService');

describe('Testa o retorno dos produtos', () => {
  describe('Testa a lista de produtos', () => {
    it('Verifica se a lista é retornada com sucesso', async () => {
      const response = await productsService.productList();

      expect(response).to.be.a('array');
    });
  });

  describe('Testa produto retornado por id', () => {
    it('Verifica se id incorreto retorna mensagem de erro', async () => {
      const response = await productsService.productById(4);

      expect(response.error.code).to.equal('notFound');
      expect(response.error.message).to.equal('Product not found');
    });

    it('Verifica se id correto retorna resposta', async () => {
      const response = await productsService.productById(1);

      expect(response).to.be.a('object');
    });
  });
});