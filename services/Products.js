const productsModal = require('../models/Products');

const productsService = {
  getAll: async () => productsModal.getAll(),
};

module.exports = productsService;