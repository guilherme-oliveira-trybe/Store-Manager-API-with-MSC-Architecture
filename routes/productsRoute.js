const express = require('express');
const productsController = require('../controllers/Products');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);

module.exports = productsRoute;