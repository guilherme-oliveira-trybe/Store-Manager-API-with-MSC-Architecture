const express = require('express');
const productsController = require('../controllers/products');
const validate = require('../middlewares/productsValidators');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);
productsRoute.get('/search', productsController.getBySearchTerm);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', validate.products, productsController.create);
productsRoute.put('/:id', validate.products, productsController.update);
productsRoute.delete('/:id', productsController.delete);

module.exports = productsRoute;