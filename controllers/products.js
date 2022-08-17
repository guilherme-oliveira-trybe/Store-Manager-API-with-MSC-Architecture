const productsService = require('../services/products');

const productsController = {
  getAll: async (req, res) => {
    const result = await productsService.getAll();
    return res.status(200).json(result);
  },
  getBySearchTerm: async (req, res) => {
    const { q: searchTerm } = req.query;
    const result = await productsService.getBySearchTerm(searchTerm);
    return res.status(200).json(result);
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const result = await productsService.getById(id);
    return res.status(200).json(result);
  },
  create: async (req, res) => {
    const { name } = req.body;
    const result = await productsService.create(name);
    return res.status(201).json(result);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await productsService.update(id, name);
    return res.status(200).json(result);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await productsService.delete(id);

    return res.status(204).end();
  },
};

module.exports = productsController;