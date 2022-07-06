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
    const productId = await productsService.addProduct(data);
    if (productId.error) {
      return res.status(productId.error.code).json({ message: productId.error.message });
    }
  
    res.status(201).json({ id: productId, name: data.name });
  },

  async editProduct(req, res) {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const editedProduct = await productsService.editProduct(id, dataToUpdate);

    if (editedProduct.error) {
      return res.status(editedProduct.error.code).json({ message: editedProduct.error.message });
    }

    res.status(200).json({ id: Number(id), name: dataToUpdate.name });
  },

  async removeProduct(req, res) {
    const { id } = req.params;
    const product = await productsService.productById(id);
    if (product.error) return res.status(404).json({ message: product.error.message });

    await productsService.removeProduct(id);
    res.status(204).json();
  },

  async productByName(req, res) {
    const { q } = req.query;

    const product = await productsService.productByName(q);

    res.status(200).json(product);
  },
};

module.exports = productsController;
