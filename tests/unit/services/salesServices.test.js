const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = require('chai')
const CustomError = require('../../../errors/customError');
const salesModel = require('../../../models/sales');
const salesServices = require('../../../services/sales');
chai.use(chaiAsPromised)

describe('Teste Sales Services', () => {
  afterEach(sinon.restore)
  describe('função getAll', () => {
    it('Caso OK, retorna array com as informações do produto', async () => {
      const resultModel = [
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
      sinon.stub(salesModel, 'getAll').resolves(resultModel);

      const result = await salesServices.getAll();

      expect(result).to.be.a('array');
      expect(result[0]).to.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(result[1]).to.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('função getById', () => {
    describe('Caso OK', () => {
      it('Retorna um array', async () => {
        const resultModel = [
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
        ];
        const id = 1;
        sinon.stub(salesModel, 'getById').resolves(resultModel);

        const result = await salesServices.getById(id);

        expect(result).to.be.a('array');
      });

      it('O objeto contido dentro do array, possui as chaves date, productId e quantity',
        async () => {
          const resultModel = [
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
          ];
          const id = 1;
          sinon.stub(salesModel, 'getById').resolves(resultModel);

          const result = await salesServices.getById(id);

          expect(result[0]).to.all.keys('date', 'productId', 'quantity');
        }
      );
    });

    describe('Caso erro', () => {
      it('Testa se o Custom error foi lançado corretamente', async () => {
        const resultModel = [];
        sinon.stub(salesModel, 'getById').resolves(resultModel);

        return expect(salesServices.getById(1))
          .to.eventually.be.rejectedWith('Sale not found')
          .and.be.an.instanceOf(CustomError)
          .and.to.have.property('status', 404);
      });
    });
  });
});
