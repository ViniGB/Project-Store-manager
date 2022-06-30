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
    const product = await connection.query(sql, [data.name]);
    return product;
  },

  async editProduct(id, dataToUpdate) {
    const sql = `
      UPDATE StoreManager.products SET ?
      WHERE ID = ?
    `;
    await connection.query(sql, [dataToUpdate, id]);
  },
};

module.exports = productsModel;
