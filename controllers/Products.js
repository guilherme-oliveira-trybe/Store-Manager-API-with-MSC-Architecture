const productsService = require('../services/Products');

const productsController = {
  getAll: async (req, res) => {
    const result = await productsService.getAll();
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
};

module.exports = productsController;