const express = require('express');
const productsController = require('../controllers/Products');
const validate = require('../middlewares/productsValidators');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', validate.products, productsController.create);

module.exports = productsRoute;