const salesProductsModel = require('../models/salesProducts');
const productsModel = require('../models/Products');
const CustomError = require('../errors/customError');

const salesProductsServices = {
  create: async (body) => {
    if (body.length === 1) {
      const [{ productId }] = body;
      const isIdExists = await productsModel.getById(productId);
      if (!isIdExists) throw new CustomError(404, 'Product not found');
    }

    const products = await Promise
      .all(body.map(({ productId }) => productsModel.getById(productId)));
    
    if (products.includes(undefined)) throw new CustomError(404, 'Product not found');

    const result = await salesProductsModel.create(body);
    return result;
  },
};

module.exports = salesProductsServices;