const salesService = require('../services/salesService');

const salesController = {
  async addSale(req, res) {
    const data = req.body;
    // const id = await salesService.addSale();
    const sale = await salesService.addSalesProducts(data);
    
    if (sale.error) {
      return res.status(sale.error.code).json({ message: sale.error.message });
    }

    res.status(201).json({ id: sale.id, itemsSold: data });
  },

};

module.exports = salesController;