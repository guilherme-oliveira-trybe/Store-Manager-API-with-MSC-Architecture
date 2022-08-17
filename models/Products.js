const connection = require('./connection');

const products = {
  getAll: async () => {
    const [result] = await connection.execute(
      'SELECT id, name FROM StoreManager.products',
    );
    return result;
  },
  getBySearchTerm: async (searchTerm) => {
    const allproducts = await products.getAll();
    const result = await allproducts.filter((p) => p.name.includes(searchTerm));
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
    const query = `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
    `;
    await connection.execute(query, [name, id]);

    return { id, name };
  },
  delete: async (id) => {
    const query = `
    DELETE FROM StoreManager.products
    WHERE id = ?;
    `;

    const [{ affectedRows }] = await connection.execute(query, [id]);
    
    return ({ affectedRows }); 
  },
};

module.exports = products;