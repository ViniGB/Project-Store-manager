const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');

describe('Testa o retorno das vendas (model)', () => {
  beforeEach(sinon.restore);
  
  describe('Testa a lista de vendas', () => {
    it('Verifica se a lista é retornada com sucesso', async () => {
      const response = await salesModel.salesList();

      expect(response).to.be.a('array');
    });

    it('Verifica se um objeto da lista possui propriedade id', async () => {
      const [response] = await salesModel.salesList();

      expect(response).to.have.a.property('saleId');
    });
  });

  describe('Testa produto retornado por id', () => {
    it('Verifica se id incorreto retorna nulo', async () => {
      const response = await salesModel.saleById(9999);

      expect(response).to.equal(null);
    });

    it('Verifica se id correto retorna resposta', async () => {
      const response = await salesModel.saleById(1);

      expect(response).to.be.a('array');
    });
  });
});