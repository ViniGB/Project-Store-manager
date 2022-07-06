const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testa o retorno dos produtos (model)', () => {
  beforeEach(sinon.restore);
  
  describe('Testa a lista de produtos', () => {
    it('Verifica se a lista é retornada com sucesso', async () => {
      const response = await productsModel.productList();

      expect(response).to.be.a('array');
    });

    it('Verifica se um objeto da lista possui propriedade id', async () => {
      const [response] = await productsModel.productList();

      expect(response).to.have.a.property('id');
    });
  });

  describe('Testa produto retornado por id', () => {
    it('Verifica se id incorreto retorna nulo', async () => {
      const response = await productsModel.productById(9999);

      expect(response).to.equal(null);
    });

    it('Verifica se id correto retorna resposta', async () => {
      const response = await productsModel.productById(1);

      expect(response).to.be.a('object');
    });
  });
});

describe('Testa o endpoint POST dos produtos (model)', () => {
  beforeEach(sinon.restore);

  const payloadProduct = {
    name: 'ProdutoX'
  };

  // before(async () => {
  //   const response = { id: 4 };

  //   sinon.stub(connection, 'query').resolves(response);
  // });

  // after(async () => {
  //   connection.query.restore();
  // });

  describe('Verifica retorno após sucesso', () => {
    it('O retorno é um objeto', async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 4 }])
      const response = await productsModel.addProduct(payloadProduct);

      expect(typeof response).to.equal('number');
    });

    // it('O retorno do objeto possui propriedade id', async () => {
    //   sinon.stub(connection, 'query').resolves([{ insertId: 4 }])
    //   const response = await productsModel.addProduct(payloadProduct);

    //   expect(response).to.have.a.property('id');
    // });
  });
});

describe('Testa o endpoint PUT dos produtos (model)', () => {
  const queryId = 1;
  const payloadProduct = {
    name: 'Martelo do Batman'
  };

  beforeEach(sinon.restore);

  describe('Verifica retorno após sucesso', () => {
    it('O retorno é registrado', async () => {
      sinon.stub(connection, 'query').resolves();
      const response = await productsModel.editProduct(queryId, payloadProduct);

      expect(response).to.be.eq(true);
    });
  });
});

describe('Testa o endpoint DELETE dos produtos (model)', () => {
  const queryId = 1;

  beforeEach(sinon.restore);

  describe('Verifica retorno após sucesso', () => {
    it('O retorno é registrado', async () => {
      sinon.stub(connection, 'query').resolves();
      const response = await productsModel.removeProduct(queryId);

      expect(response).to.be.eq(undefined);
    });
  });
});
