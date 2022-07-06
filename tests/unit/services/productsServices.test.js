const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('Testa o retorno dos produtos (services)', () => {
  beforeEach(sinon.restore);

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

describe('Testa o endpoint POST dos produtos (services)', () => {
  describe('Testa validações para payload incorreto', () => {
    beforeEach(sinon.restore);
    const noNameProduct = {};
    const incorrectNameProduct = { name: 'Mar' };
    

    it('Retorna que nome é obrigatório', async () => {
      sinon.stub(connection, 'query').resolves();
      const response = await productsService.addProduct(noNameProduct);

      expect(response.error.code).to.equal(400);
      expect(response.error.message).to.equal('"name" is required');
    });

    it('Retorna que nome deve conter no mínimo 5 caracteres', async () => {
      sinon.stub(connection, 'query').resolves();
      const response = await productsService.addProduct(incorrectNameProduct);

      expect(response.error.code).to.equal(422);
      expect(response.error.message).to.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('Testa validação para payload correto', () => {
    const correctNameProduct = { name: 'Martelo do Batman' };

    before(() => {
      sinon.stub(productsModel, 'addProduct')
        .resolves([]);
    });

    after(() => {
      productsModel.addProduct.restore();
    });

    it('Retorna resposta com sucesso', async () => {
      const response = await productsService.addProduct(correctNameProduct);

      expect(typeof response).to.be.eq('object');
    });
  });
});

describe('Testa o endpoint PUT dos produtos (services)', () => {
  describe('Testa validações para payload correto/incorreto', () => {
    beforeEach(sinon.restore);

    describe('Verifica erro se produto não for encontrado', () => {
      const noNameProduct = {};
      const ID = 9999;

      it('Retorna que produto não foi encontrado', async () => {
        const response = await productsService.editProduct(ID, noNameProduct);

        expect(response.error.code).to.equal(404);
        expect(response.error.message).to.equal('Product not found');
      });
    });

    describe('Verifica erro se nome não for informado', () => {
      const noNameProduct = {};
      const ID = 1;

      it('Retorna que nome é obrigatório', async () => {
        const response = await productsService.editProduct(ID, noNameProduct);

        expect(response.error.code).to.equal(400);
        expect(response.error.message).to.equal('"name" is required');
      });
    });

    describe('Verifica erro se nome tiver menos de 5 caracteres', () => {
      const incorrectNameProduct = { name: 'Mar' };
      const ID = 1;

      it('Retorna que nome deve conter no mínimo 5 caracteres', async () => {
        const response = await productsService.editProduct(ID, incorrectNameProduct);

        expect(response.error.code).to.equal(422);
        expect(response.error.message).to.equal('"name" length must be at least 5 characters long');
      });
    });

    describe('Verifica resposta com sucesso', () => {
      const correctNameProduct = { name: 'Martelo do Batman' };
      const ID = 1;

      it('Retorna resposta com sucesso', async () => {
        sinon.stub(productsModel, 'editProduct').resolves(true);
        const response = await productsService.editProduct(ID, correctNameProduct);

        expect(response).to.be.eq(true);
      });
    });
  });
});

describe('Testa o endpoint DELETE dos produtos (services)', () => {
  beforeEach(sinon.restore);

  describe('Testa validações para payload correto/incorreto', () => {
    const queryId = 1;

    it('Retorna que nome é obrigatório', async () => {
      sinon.stub(connection, 'query').resolves();
      const response = await productsService.removeProduct(queryId);

      expect(response).to.be.eq(undefined);
    });
  });
});