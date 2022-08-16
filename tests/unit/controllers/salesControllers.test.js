const { expect } = require('chai');
const sinon = require('sinon');
const salesServices = require('../../../services/sales');
const salesControllers = require('../../../controllers/sales');
const testMyController = require('../../utils/');

describe('Teste SalesProducts Controllers', () => {
  afterEach(sinon.restore)

  describe('função getAll', () => {
    it('Retorna status 200', async () => {
      const resultService = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
      sinon.stub(salesServices, 'getAll').resolves(resultService);

      const result = await testMyController(salesControllers.getAll);

      expect(result.status).to.be.equal(200);
    });

    it('Retorna json com as informações de todas as vendas', async () => {
      const resultService = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
      
      sinon.stub(salesServices, 'getAll').resolves(resultService);

      const result = await testMyController(salesControllers.getAll);

      expect(result.body).to.be.deep.equal(resultService);
    });
  });

  describe('função getById', () => {
    it('Retorna status 200', async () => {
      const resultService = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
      const params = 1;
      sinon.stub(salesServices, 'getById').resolves(resultService);

      const result = await testMyController(salesControllers.getById, { params });

      expect(result.status).to.be.equal(200);
    });

    it('Retorna json com as informações da venda enviada pelo parametro', async () => {
      const resultService = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
      const params = 1;
      sinon.stub(salesServices, 'getById').resolves(resultService);

      const result = await testMyController(salesControllers.getById, { params });

      expect(result.body).to.be.deep.equal(resultService);
    });
  })
});