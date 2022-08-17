const CustomError = require('../errors/customError');
const salesModel = require('../models/sales');

const salesServices = {
  getAll: async () => salesModel.getAll(),
  getById: async (idSale) => {
    const result = await salesModel.getById(idSale);
    if (!result.length) throw new CustomError(404, 'Sale not found');

    return result;
  },

  delete: async (id) => {
    const result = await salesModel.getById(id);
    console.log(result);
    if (!result.length) throw new CustomError(404, 'Sale not found');

    return salesModel.delete(id);
  },
};

module.exports = salesServices;