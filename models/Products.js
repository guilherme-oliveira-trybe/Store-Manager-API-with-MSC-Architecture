const connection = require('./connection');

const products = {
  getAll: async () => {
    const [result] = await connection.execute(
      'SELECT id, name FROM StoreManager.products',
    );
    return result;
  },
};

module.exports = products;