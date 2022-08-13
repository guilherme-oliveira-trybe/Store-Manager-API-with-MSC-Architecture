const salesProductsServices = require('../services/salesProducts');

const salesProductsControllers = {
  create: async (req, res) => {
    const result = await salesProductsServices.create(req.body);
    return res.status(201).json(result);
  },
};

module.exports = salesProductsControllers;