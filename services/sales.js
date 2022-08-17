const CustomError = require('../errors/customError');
const salesModel = require('../models/sales');
const productsModel = require('../models/Products');

const salesServices = {
  getAll: async () => salesModel.getAll(),
  getById: async (idSale) => {
    const result = await salesModel.getById(idSale);
    if (!result.length) throw new CustomError(404, 'Sale not found');

    return result;
  },

  update: async (saleId, body) => {
    const result = await salesModel.getById(saleId);
    if (!result.length) throw new CustomError(404, 'Sale not found');

    const products = await Promise
      .all(body.map(({ productId }) => productsModel.getById(productId)));

    if (products.includes(undefined)) throw new CustomError(404, 'Product not found');

    return salesModel.update(saleId, body);
  },

  delete: async (id) => {
    const result = await salesModel.getById(id);
    console.log(result);
    if (!result.length) throw new CustomError(404, 'Sale not found');

    return salesModel.delete(id);
  },
};

module.exports = salesServices;