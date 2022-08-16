const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = require('chai')
const CustomError = require('../../../errors/customError');
const salesProductsModel = require('../../../models/salesProducts');
const salesProductsServices = require('../../../services/salesProducts');
const productsModel = require('../../../models/Products');
chai.use(chaiAsPromised);

describe('Teste SalesProducts Services', () => {
  afterEach(sinon.restore)

  describe('função create', () => {
    describe('Quando a requisição possue mais de 1 produto', () => {
      describe('Caso OK', () => {
        it('Retorna um objeto, com as chaves id e itemsSold', async () => {
          const resultSalesProductsModel = {
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
          const resultProductsModel = [
            { id: 1, name: 'Martelo de Thor' },
            { id: 2, name: 'Traje de encolhimento' }
          ]
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
          sinon.stub(productsModel, 'getById').resolves(resultProductsModel);
          sinon.stub(salesProductsModel, 'create').resolves(resultSalesProductsModel);
    
          const result = await salesProductsServices.create(body);
    
          expect(result).to.be.a('object');
          expect(result).to.all.keys('id', 'itemsSold');
          expect(result.itemsSold).to.have.length(2);
        });
      })

      // describe('Caso erro', () => {
      //   it('Testa se o Custom error foi lançado corretamente', async () => {
      //     const body = [
      //       {
      //         "productId": 1,
      //         "quantity": 1
      //       },
      //       {
      //         "productId": 10,
      //         "quantity": 5
      //       }
      //     ]
      //     const resultProductsModel = [{ id: 1, name: 'Martelo de Thor' }, undefined];
      //     sinon.stub(productsModel, 'getById').resolves(resultProductsModel);

      //     return expect(salesProductsServices.create(body))
      //       .to.eventually.be.rejectedWith('Product not found')
      //       .and.be.an.instanceOf(CustomError)
      //       .and.to.have.property('status', 404);
      //   })
      // })
    });

    describe('Quando a requisição possue 1 produto', () => {
      describe('Caso OK', () => {
        it('Retorna um objeto, com as chaves id e itemsSold', async () => {
          const body = [{ "productId": 1, "quantity": 1 }];
          const resultProductsModel = [{ id: 1, name: 'Martelo de Thor' }];
          const resultSalesProductsModel = {
            "id": 3,
            "itemsSold": [
              {
                "productId": 1,
                "quantity": 1
              }
            ]
          };
          sinon.stub(productsModel, 'getById').resolves(resultProductsModel);
          sinon.stub(salesProductsModel, 'create').resolves(resultSalesProductsModel);

          const result = await salesProductsServices.create(body);

          expect(result).to.be.a('object');
          expect(result).to.all.keys('id', 'itemsSold');
          expect(result.itemsSold).to.have.length(1);
        })
      })

      describe('Caso erro', () => {
        it('Testa se o Custom error foi lançado corretamente', async () => {
          const body = [{ "productId": 10, "quantity": 1 }];
          const resultProductsModel = undefined;
          sinon.stub(productsModel, 'getById').resolves(resultProductsModel);

          return expect(salesProductsServices.create(body))
            .to.eventually.be.rejectedWith('Product not found')
            .and.be.an.instanceOf(CustomError)
            .and.to.have.property('status', 404);
        })
      })
    })
  });
})