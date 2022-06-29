const productsModel = require('../models/productsModel');

const orderProductsById = (productList) => {
  const orderedList = productList.sort((a, b) => a.id - b.id);
  return orderedList;
};

const productsService = {
  async productList() {
    const products = await productsModel.productList();
    return orderProductsById(products);
  },

  async productById(id) {
    const product = await productsModel.productById(id);

    if (!product) {
      return {
        error: {
          code: 'notFound',
          message: 'Product not found',
        },
      };
    }

    return product;
  },
};

module.exports = productsService;
