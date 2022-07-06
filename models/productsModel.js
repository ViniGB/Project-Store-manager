const connection = require('./connection');

const productsModel = {
  async productList() {
    const sql = `
      SELECT *
      FROM StoreManager.products
    `;
    const [list] = await connection.query(sql);
    return list;
  },

  async productById(id) {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id = ?
    `;
    const [product] = await connection.query(sql, [id]);

    if (product.length === 0) return null;
    return product[0];
  },

  async addProduct(data) {
    const sql = `
      INSERT INTO StoreManager.products (name)
      VALUES (?)
    `;
    const [{ insertId }] = await connection.query(sql, [data.name]);
    return insertId;
  },

  async editProduct(id, dataToUpdate) {
    const sql = `
      UPDATE StoreManager.products SET ?
      WHERE ID = ?
    `;
    await connection.query(sql, [dataToUpdate, id]);
    return true;
  },

  async removeProduct(id) {
    const sql = `
      DELETE FROM StoreManager.products
      WHERE id = ?
    `;
    await connection.query(sql, [id]);
  },

  async productByName(data) {
    const sql = `
      SELECT * FROM StoreManager.products
      WHERE name LIKE ?
    `;
    const [list] = await connection.query(sql, [data]);
    return list;
  },
};

module.exports = productsModel;
