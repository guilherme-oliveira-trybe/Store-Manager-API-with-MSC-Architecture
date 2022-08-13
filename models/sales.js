const connection = require('./connection');

const sales = {
  create: async () => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales () VALUES ()',
    );
    return insertId;
  },
};

module.exports = sales;