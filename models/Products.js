const connection = require('./connection');

const products = {
  getAll: async () => {
    const [result] = await connection.execute(
      'SELECT id, name FROM StoreManager.products',
    );
    return result;
  },
  getById: async (id) => {
    const [[result]] = await connection.execute(
      'SELECT id, name FROM StoreManager.products WHERE id = ?', [id],
    );
    return result;
  },
  create: async (name) => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
    );
    return { id: insertId, name };
  },
  update: async (id, name) => {
    console.log(name);
    const query = `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
    `;
    await connection.execute(query, [name, id]);

    return { id, name };
  },
};

module.exports = products;