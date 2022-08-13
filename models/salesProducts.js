const connection = require('./connection');
const salesModel = require('./sales');

const salesProducts = {
  create: async (body) => {
    const id = await salesModel.create();
    const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`;
    await Promise.all(body.map(({ productId, quantity }) => connection.execute(query, [id, productId, quantity])));

    return { id, itemsSold: body };
  },
};

module.exports = salesProducts;