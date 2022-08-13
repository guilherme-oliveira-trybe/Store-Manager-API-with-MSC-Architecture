const productsModel = require('../models/Products');
const CustomError = require('../errors/customError');

const productsService = {
  getAll: async () => productsModel.getAll(),
  getById: async (id) => {
    const result = await productsModel.getById(id);
    if (!result) throw new CustomError(404, 'Product not found');

    return result;
  },
  create: async (name) => {
    const result = await productsModel.create(name);
    return result;
  },
};

module.exports = productsService;