const salesProductsModel = require('../models/salesProducts');
const productsModel = require('../models/products');
const CustomError = require('../errors/customError');

const salesProductsServices = {
  create: async (body) => {
    const products = await Promise
      .all(body.map(({ productId }) => productsModel.getById(productId)));
    
    if (products.includes(undefined)) throw new CustomError(404, 'Product not found');

    const result = await salesProductsModel.create(body);
    return result;
  },
};

module.exports = salesProductsServices;