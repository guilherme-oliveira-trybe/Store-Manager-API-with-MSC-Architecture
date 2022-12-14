const productsModel = require('../models/products');
const CustomError = require('../errors/customError');

const productsService = {
  getAll: async () => productsModel.getAll(),
  getBySearchTerm: async (searchTerm) => {
    const result = await productsModel.getBySearchTerm(searchTerm);

    return result;
  },
  getById: async (id) => {
    const result = await productsModel.getById(id);
    if (!result) throw new CustomError(404, 'Product not found');

    return result;
  },
  create: async (name) => {
    const result = await productsModel.create(name);
    return result;
  },
  update: async (id, name) => {
    const result = await productsModel.getById(id);
    if (!result) throw new CustomError(404, 'Product not found');

    return productsModel.update(id, name);
  },
  delete: async (id) => {
    const result = await productsModel.getById(id);
    if (!result) throw new CustomError(404, 'Product not found');

    return productsModel.delete(id);
  },
};

module.exports = productsService;