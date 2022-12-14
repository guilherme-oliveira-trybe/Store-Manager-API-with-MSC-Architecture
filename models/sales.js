const connection = require('./connection');

const sales = {
  getAll: async () => {
    const query = `
    SELECT id AS saleId, date, product_id AS productId, quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id; `;
    const [result] = await connection.execute(query);
    return result;
  },

  getById: async (idSale) => {
    const query = `
    SELECT date, product_id AS productId, quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY s.id, sp.product_id; `;
    const [result] = await connection.execute(query, [idSale]);
    return result;
  },

  create: async () => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales () VALUES ()',
    );
    return insertId;
  },

  update: async (saleId, body) => {
    const query = `
    UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ? AND product_id = ?
    `;
    await Promise
      .all(body.map(({ productId, quantity }) => connection
        .execute(query, [productId, quantity, saleId, productId]))); 
    
    return { saleId, itemsUpdated: body };
  },

  delete: async (id) => {
  const query = `
    DELETE FROM StoreManager.sales
    WHERE id = ?;
    `;

  const [{ affectedRows }] = await connection.execute(query, [id]);

  return ({ affectedRows });
},
};

module.exports = sales;