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

  async addProduct(req, res) {
    const data = req.body;
    const product = await productsService.addProduct(data);
    if (product.error) {
      return res.status(product.error.code).json({ message: product.error.message });
    }
    const productById = await productsService.productById(product[0].insertId);

    res.status(201).json(productById);
  },

  async editProduct(req, res) {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const editedProduct = await productsService.editProduct(id, dataToUpdate);

    if (editedProduct.error) {
      return res.status(editedProduct.error.code).json({ message: editedProduct.error.message });
    }

    res.status(200).json({ id, name: dataToUpdate.name });
  },
};

module.exports = productsController;
