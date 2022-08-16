const sinon = require('sinon');
const { expect } = require('chai')
const salesModel = require('../../../models/sales');
const connection = require('../../../models/connection')

describe('Teste Sales Models', () => {
  afterEach(sinon.restore)
  describe('função getAll', () => {
    it('Retorna um array', async () => {
      const resultExecute = [];
      sinon.stub(connection, 'execute').resolves([resultExecute]);

      const result = await salesModel.getAll();

      expect(result).to.be.a('array');
    })

    it('Retorna um array que contenha objetos, caso DB esteja populado', async () => {
      const resultExecute = [{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }];
      sinon.stub(connection, 'execute').resolves([resultExecute]);

      const [result] = await salesModel.getAll();

      expect(result).to.be.a('object');
      expect(result).to.all.keys('saleId', 'date', 'productId', 'quantity');
    })
  });

  describe('função getById', () => {
    it('Retorna um array que contenha objetos, com as informações de vendas do Id informado', async () => {
      const resultExecute = [{
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }];
      sinon.stub(connection, 'execute').resolves([resultExecute]);

      const [result] = await salesModel.getById(1);

      expect(result).to.be.a('object');
      expect(result).to.all.keys('date', 'productId', 'quantity');
      expect(result.productId).to.be.equal(1);
      expect(result.quantity).to.be.equal(2);
    })
  })

  describe('função create', () => {
    it('Retorna o Id da venda criada', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await salesModel.create();

      expect(result).to.be.equal(4);
    })
  })
})