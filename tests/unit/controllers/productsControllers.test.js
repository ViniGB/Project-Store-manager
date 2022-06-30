const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController');

describe('Testa o chamado do controller get dos produtos', () => {
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
      await productsController.productList(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se id errado retorna mensagem de erro', async () => {
      request.params = { id: 4 };
      await productsController.productById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });

    it('Verifica se id correto retorna produto', async () => {
      request.params = { id: 1 };
      await productsController.productById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});