const express = require('express');
const salesProductsControllers = require('../controllers/salesProducts');
const validate = require('../middlewares/salesProductsValidators');

const salesProductsRoute = express.Router();

salesProductsRoute.post('/', validate.sales, salesProductsControllers.create);

module.exports = salesProductsRoute;