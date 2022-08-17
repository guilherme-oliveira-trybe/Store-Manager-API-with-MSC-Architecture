const salesServices = require('../services/sales');

const salesControllers = {
  getAll: async (req, res) => {
    const result = await salesServices.getAll();
    return res.status(200).json(result);
  },
  
  getById: async (req, res) => {
    const { id } = req.params;
    const result = await salesServices.getById(id);
    return res.status(200).json(result);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await salesServices.delete(id);

    return res.status(204).end();
  },
};

module.exports = salesControllers;