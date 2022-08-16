const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = require('chai')
const CustomError = require('../../../errors/customError');
const productsModel = require('../../../models/Products');
const productsServices = require('../../../services/Products');
chai.use(chaiAsPromised);

describe('Teste Products Services', () => {
  afterEach(sinon.restore)
  describe('função getAll', () => {
    it('Caso OK, retorna array com as informações do produto', async () => {
      const resultModel = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ];
      sinon.stub(productsModel, 'getAll').resolves(resultModel);

      const result = await productsServices.getAll();

      expect(result).to.be.a('array');
    });
  });

  describe('função getById', () => {
    describe('Caso OK', () => {
      it('Retorna um objeto', async () => {
        const resultModel = {};
        const id = 5;
        sinon.stub(productsModel, 'getById').resolves(resultModel);

        const result = await productsServices.getById(id);

        expect(result).to.be.a('object');
      });

      it('O objeto retornado, possui as chaves id e name', async () => {
        const resultModel = { id: 5, name: 'Rolo de Macarrão da Flávia' };
        const id = 5;
        sinon.stub(productsModel, 'getById').resolves(resultModel);

        const result = await productsServices.getById(id);

        expect(result).to.all.keys('id', 'name');
      });
    });

    describe('Caso erro', () => {
      it('Testa se o Custom error foi lançado corretamente', async () => {
        const resultModel = undefined;
        sinon.stub(productsModel, 'getById').resolves(resultModel);

        return expect(productsServices.getById(5))
          .to.eventually.be.rejectedWith('Product not found')
          .and.be.an.instanceOf(CustomError)
          .and.to.have.property('status', 404);
      });
    });
  });

  describe('função create', () => {
    it('Retorna um objeto, com as chaves id e name criados', async () => {
      const resultModel = { id: 5, name: 'Rolo de Macarrão da Flávia' };
      const name = 'Rolo de Macarrão da Flávia';
      sinon.stub(productsModel, 'create').resolves(resultModel);

      const result = await productsServices.create(name);

      expect(result).to.be.a('object').and.to.include({ id: 5, name, });
    });
  });

  describe('função update', () => {
    describe('Caso OK', () => {
      it('Retorna um objeto com as informações atualizadas', async () => {
        const resultModelGetById = { id: 5, name: 'Rolo de Macarrão da Flávia' };
        const resultModelUpdate = { id: 5, name: 'Anel do Lanterna Verde' };
        const name = 'Anel do Lanterna Verde';
        const id = 5;
        sinon.stub(productsModel, 'getById').resolves(resultModelGetById);
        sinon.stub(productsModel, 'update').resolves(resultModelUpdate);

        const result = await productsServices.update(id, name);

        expect(result).to.be.a('object').and.to.include({ id, name });
      });
    });

    describe('Caso erro', () => {
      it('Testa se o Custom error foi lançado corretamente', async () => {
        const resultModel = undefined;
        const name = 'Anel do Lanterna Verde';
        const id = 5;
        sinon.stub(productsModel, 'getById').resolves(resultModel);

        return expect(productsServices.update(id, name))
          .to.eventually.be.rejectedWith('Product not found')
          .and.be.an.instanceOf(CustomError)
          .and.to.have.property('status', 404);
      });
    });
  });

  describe('função delete', () => {
    describe('Caso ok', () => {
      it('Deleta o produto do Id informado', async () => {
        const resultModelGetById = { id: 5, name: 'Rolo de Macarrão da Flávia' };
        const resultModelDelete = { affectedRows: 1 };
        const id = 5;
        sinon.stub(productsModel, 'getById').resolves(resultModelGetById);
        sinon.stub(productsModel, 'delete').resolves(resultModelDelete);

        const result = await productsServices.delete(id);

        expect(result).to.be.a('object').and.to.have.property('affectedRows', 1);
      });
    });

    describe('Caso erro', () => {
      it('Testa se o Custom error foi lançado corretamente', async () => {
        const resultModel = undefined;
        const id = 5;
        sinon.stub(productsModel, 'getById').resolves(resultModel);

        return expect(productsServices.delete(id))
          .to.eventually.be.rejectedWith('Product not found')
          .and.be.an.instanceOf(CustomError)
          .and.to.have.property('status', 404);
      });
    });
  });
});