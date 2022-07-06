const salesService = require('../services/salesService');

const salesController = {
  async addSale(req, res) {
    const data = req.body;
    const sale = await salesService.addSalesProducts(data);
    
    if (sale.error) {
      return res.status(sale.error.code).json({ message: sale.error.message });
    }

    res.status(201).json({ id: sale.id, itemsSold: data });
  },

  async salesList(_req, res) {
    const sales = await salesService.salesList();

    res.status(200).json(sales);
  },

  async saleById(req, res) {
    const { id } = req.params;
    const sale = await salesService.saleById(id);

    if (sale.error) return res.status(sale.error.code).json({ message: sale.error.message });

    res.status(200).json(sale);
  },

  async removeSale(req, res) {
    const { id } = req.params;
    const sale = await salesService.removeSaleProducts(id);

    if (sale.error) return res.status(sale.error.code).json({ message: sale.error.message });

    res.status(204).json();
  },

  async editSale(req, res) {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const sale = await salesService.editSale(id, dataToUpdate);

    if (sale.error) {
      return res.status(sale.error.code).json({ message: sale.error.message });
    }

    res.status(200).json({ saleId: Number(sale.id), itemsUpdated: dataToUpdate });
  },
};

module.exports = salesController;