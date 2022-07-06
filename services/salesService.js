const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const newDate = new Date();

const checkIfProductId = (data) => {
  const checkIfExists = data.find((product) => !product.productId);
  if (checkIfExists) return false;
  return true;
};

const validateProductId = async (data) => {
  const booleanData = await Promise.all(data.map(async (product) => {
    const checkProduct = await productsModel.productById(product.productId);
    if (!checkProduct) return false;
    return true;
  }));
  const returnValidation = booleanData.every((boolean) => boolean);
  if (!returnValidation) return false;
  return true;
};

const checkIfQuantity = (data) => {
  const checkIfExists = data.some((product) => !product.quantity && product.quantity !== 0);
  if (checkIfExists) return false;
  return true;
};

const validateQuantity = (data) => {
  const isQuantityValid = data.find((product) => product.quantity <= 0);
  if (isQuantityValid) return false;
  return true;
};

const salesService = {
  async addSale() {
    const id = await salesModel.addSale(newDate);
    return id;
  },

  async addSalesProducts(data) {
    const productIdExists = checkIfProductId(data);
    if (!productIdExists) return { error: { code: 400, message: '"productId" is required' } };

    const isProductIdValid = await validateProductId(data);
    if (!isProductIdValid) return { error: { code: 404, message: 'Product not found' } };

    const quantityExists = checkIfQuantity(data);
    if (!quantityExists) return { error: { code: 400, message: '"quantity" is required' } };

    const isQuantityValid = validateQuantity(data);
    if (!isQuantityValid) {
      return {
        error: { code: 422, message: '"quantity" must be greater than or equal to 1' },
      };
    }

    const id = await salesModel.addSale();

    await Promise.all(data.map((product) => salesModel
      .addSalesProducts(id, product.productId, product.quantity)));
    return { error: false, id };
  },

  async salesList() {
    const sales = await salesModel.salesList();
    return sales;
  },

  async saleById(id) {
    const sale = await salesModel.saleById(id);

    if (!sale) {
      return {
        error: {
          code: 404,
          message: 'Sale not found',
        },
      };
    }

    const wantedSaleObject = sale.map((currSale) => {
      const obj = {
        date: currSale.date,
        productId: currSale.productId,
        quantity: currSale.quantity,
      };
      return obj;
    });

    return wantedSaleObject;
  },

  async removeSale(id) {
    await salesModel.removeSale(id);
  },

  async removeSaleProducts(id) {
    const sale = await await salesModel.saleById(id);
    if (!sale) {
      return {
        error: {
          code: 404,
          message: 'Sale not found',
        },
      };
    }

    await salesModel.removeSale(id);
    await salesModel.removeSaleProducts(id);
    return true;
  },
};

module.exports = salesService;