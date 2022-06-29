const productsService = require('../services/productsService');

const productsController = {
  async productList(_req, res) {
    const products = await productsService.productList();

    res.status(200).json(products);
  },

  async productById(req, res) {
    const { id } = req.params;
    const product = await productsService.productById(id);

    if (product.error) return res.status(404).json({ message: product.error.message });

    res.status(200).json(product);
  },
};

module.exports = productsController;
