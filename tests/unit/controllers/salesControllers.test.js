const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController');

describe('Testa o chamado do controller get das vendas', () => {
  describe('Testa a lista de produtos', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

    it('Verifica sucesso no retorno da lista', async () => {
      await salesController.salesList(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se id errado retorna mensagem de erro', async () => {
      request.params = { id: 9999 };
      await salesController.saleById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });

    it('Verifica se id correto retorna produto', async () => {
      request.params = { id: 1 };
      await salesController.saleById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});