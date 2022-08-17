const express = require('express');
const salesProductsControllers = require('../controllers/salesProducts');
const salesControllers = require('../controllers/sales');
const validate = require('../middlewares/salesProductsValidators');

const salesProductsRoute = express.Router();

salesProductsRoute.get('/', salesControllers.getAll);
salesProductsRoute.get('/:id', salesControllers.getById);
salesProductsRoute.post('/', validate.sales, salesProductsControllers.create);
salesProductsRoute.delete('/:id', salesControllers.delete);

module.exports = salesProductsRoute;