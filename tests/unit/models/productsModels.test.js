const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testa o retorno dos produtos', () => {
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
      const response = await productsModel.productById(4);

      expect(response).to.equal(null);
    });

    it('Verifica se id correto retorna resposta', async () => {
      const response = await productsModel.productById(1);

      expect(response).to.be.a('object');
    });
  });
});