const productsService = require('../services/Products');

const productsController = {
  getAll: async (req, res) => {
    const result = await productsService.getAll();
    return res.status(200).json(result);
  },
};

module.exports = productsController;