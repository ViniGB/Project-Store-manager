const productsModel = require('../models/productsModel');

const orderProductsById = (productList) => {
  const orderedList = productList.sort((a, b) => a.id - b.id);
  return orderedList;
};

const validateName = (data) => {
  if (!data.name) return false;
  return true;
};

const validateNameLength = (data) => {
  if (data.name.length < 5) return false;
  return true;
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

  async addProduct(data) {
    const checkIfName = validateName(data);
    if (!checkIfName) {
      return {
        error: { code: 400, message: '"name" is required' },
      };
    }
    const checkIfNameIsValid = validateNameLength(data);
    if (!checkIfNameIsValid) {
      return {
        error: { code: 422, message: '"name" length must be at least 5 characters long' },
      };
    }
    const product = await productsModel.addProduct(data);

    return product;
  },
};

module.exports = productsService;
