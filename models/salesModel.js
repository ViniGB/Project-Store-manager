const connection = require('./connection');

const salesModel = {
  async addSale(date) {
    const sql = `
      INSERT INTO StoreManager.sales (date)
      VALUES (?)
    `;
    const [{ insertId }] = await connection.query(sql, [date]);
    return insertId;
  },

  async addSalesProducts(salesId, productId, quantity) {
    const sql = `
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
    await connection.query(sql, [salesId, productId, quantity]);
  },
};

module.exports = salesModel;