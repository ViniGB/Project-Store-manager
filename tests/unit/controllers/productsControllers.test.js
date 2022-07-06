const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService')
const productsController = require('../../../controllers/productsController');
const connection = require('../../../models/connection');

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

describe('Testa o endpoint POST dos produtos (controllers)', () => {
  describe('Testa erro quando body é incorreto', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

    it('Verifica o status 400 quando nome não é informado', async () => {
      await productsController.addProduct(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('Verifica mensagem de erro "name" is required', async () => {
      await productsController.addProduct(request, response);

      expect(response.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
    });
  });

  describe('Testa erro quando body é correto', () => {
    const response = {};
    const request = {};
    before(() => {
      request.body = { name: 'ProdutoX' };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(productsService, 'addProduct')
        .resolves(true);
    });

    after(() => {
      productsService.addProduct.restore();
    });

    it('Verifica o status 201 quando nome correto é informado', async () => {
      await productsController.addProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe('Testa o endpoint PUT dos produtos (controllers)', () => {
  beforeEach(sinon.restore);

  it('Testa erro quando id informado é inválido', async () => {
    const response = {};
    const request = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    request.params = { id: 'número' };
    
    await productsController.editProduct(request, response);

    expect(response.status.calledWith(404)).to.be.equal(true);
  });

  it('Verifica o status 200 quando body correto é informado', async () => {
    const response = {};
    const request = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    request.params = { id: 1 };
    request.body = { name: 'Martelo do Batman' };
    
    sinon.stub(productsService, 'editProduct').resolves(true);
    await productsController.editProduct(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Testa o endpoint DELETE dos produtos (controllers)', () => {
  beforeEach(sinon.restore);

  it('Testa erro quando id informado é inválido', async () => {
    const response = {};
    const request = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    request.params = { id: 'número' };
    
    await productsController.removeProduct(request, response);

    expect(response.status.calledWith(404)).to.be.equal(true);
  });

  it('Verifica o status 200 quando body correto é informado', async () => {
    const response = {};
    const request = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    request.params = { id: 1 };
    
    sinon.stub(productsService, 'removeProduct').resolves()
    await productsController.removeProduct(request, response);

    expect(response.status.calledWith(204)).to.be.equal(true);
  });
});