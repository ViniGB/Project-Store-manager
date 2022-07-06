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

  async salesList() {
    const sql = `
      SELECT sale_id AS saleId,
        product_id AS productId,
        quantity,
        date
      FROM StoreManager.sales_products AS salesProducts
      JOIN StoreManager.sales AS sales
      ON salesProducts.sale_id = sales.id
      ORDER BY saleId ASC, productId ASC;
    `;
    const [list] = await connection.query(sql);
    return list;
  },

  async saleById(id) {
    const sql = `
      SELECT sale_id AS saleId,
        product_id AS productId,
        quantity,
        date
      FROM StoreManager.sales_products AS salesProducts
      JOIN StoreManager.sales AS sales
      ON salesProducts.sale_id = sales.id
      WHERE id = ?
      ORDER BY saleId ASC, productId ASC;
    `;
    const [list] = await connection.query(sql, [id]);

    if (list.length === 0) return null;
    return list;
  },

  async removeSale(id) {
    const sql = `
      DELETE FROM StoreManager.sales
      WHERE id = ?
    `;
    await connection.query(sql, [id]);
  },

  async removeSaleProducts(id) {
    const sql = `
      DELETE FROM StoreManager.sales_products
      WHERE sale_id = ?
    `;
    await connection.query(sql, [id]);
  },
};

module.exports = salesModel;