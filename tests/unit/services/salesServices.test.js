const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');

describe('Testa o retorno dos produtos (services)', () => {
  beforeEach(sinon.restore);

  describe('Testa a lista de produtos', () => {
    it('Verifica se a lista é retornada com sucesso', async () => {
      const response = await salesService.salesList();

      expect(response).to.be.a('array');
    });
  });

  describe('Testa produto retornado por id', () => {
    it('Verifica se id incorreto retorna mensagem de erro', async () => {
      const response = await salesService.saleById(9999);

      expect(response.error.code).to.equal(404);
      expect(response.error.message).to.equal('Sale not found');
    });

    it('Verifica se id correto retorna resposta', async () => {
      const response = await salesService.saleById(1);

      expect(response).to.be.a('array');
    });
  });
});