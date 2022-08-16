const sinon = require('sinon');
const { expect } = require('chai')
const salesProductsModel = require('../../../models/salesProducts');
const salesModel = require('../../../models/sales');
const connection = require('../../../models/connection')

describe('Teste SalesProducts Models', () => {
  afterEach(sinon.restore)
  describe('função create', () => {
    it('Retorna um objeto, com as chaves id e itemsSold', async () => {
      const resultExecute = {
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
      };
      const id = 3
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
      sinon.stub(salesModel, 'create').resolves(id);
      sinon.stub(connection, 'execute').resolves([resultExecute]);

      const result = await salesProductsModel.create(body);

      expect(result).to.be.a('object');
      expect(result).to.all.keys('id', 'itemsSold');
      expect(result.id).to.be.equal(3);
      expect(result.itemsSold).to.be.equal(body);
    });
  });
})