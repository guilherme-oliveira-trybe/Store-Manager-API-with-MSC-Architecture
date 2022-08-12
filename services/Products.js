const productsModal = require('../models/Products');
const CustomError = require('../errors/customError');

const productsService = {
  getAll: async () => productsModal.getAll(),
  getById: async (id) => {
    const result = await productsModal.getById(id);
    if (!result) throw new CustomError(404, 'Product not found');

    return result;
  },
};

module.exports = productsService;