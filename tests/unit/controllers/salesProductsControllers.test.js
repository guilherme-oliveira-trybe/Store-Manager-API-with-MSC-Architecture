const { expect } = require('chai');
const sinon = require('sinon');
const salesProductsServices = require('../../../services/salesProducts');
const salesProductsControllers = require('../../../controllers/salesProducts');
const testMyController = require('../../utils/');

describe('Teste SalesProducts Controllers', () => {
  afterEach(sinon.restore)
  
  describe('função create', () => {
    it('Retorna status 201', async () => {
      const resultService = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      }
      const body = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ] 
      sinon.stub(salesProductsServices, 'create').resolves(resultService);

      const result = await testMyController(salesProductsControllers.create, { body, });

      expect(result.status).to.be.equal(201);
    });

    it('Retorna json com as informações da Venda criada', async () => {
      const resultService = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      }
      const body = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
      sinon.stub(salesProductsServices, 'create').resolves(resultService);

      const result = await testMyController(salesProductsControllers.create, { body, });

      expect(result.body).to.be.deep.equal(resultService);
    });
  });
});