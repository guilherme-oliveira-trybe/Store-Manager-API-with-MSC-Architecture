const sinon = require('sinon');
const { expect } = require('chai')
const productsModel = require('../../../models/Products');
const connection = require('../../../models/connection')

describe('Teste Products Models', () => {
  afterEach(sinon.restore)
  describe('função getAll', () => {
    it('Retorna um array', async () => {
      const resultExecute = [];
      sinon.stub(connection, 'execute').resolves([resultExecute]);

      const result = await productsModel.getAll();

      expect(result).to.be.a('array');
    });

    it('Retorna um array que contenha objetos, caso DB esteja populado', async () => {
      const resultExecute = [{ id: 1, name: 'Martelo de Thor' }];
      sinon.stub(connection, 'execute').resolves([resultExecute]);

      const [result] = await productsModel.getAll();

      expect(result).to.be.a('object');
      expect(result).to.all.keys('id', 'name');
    });
  });

  describe('função getById', () => {
    it('Retorna um objeto, caso o Id do produto seja encontrado', async () => {
      const resultExecute = [{ id: 1, name: 'Martelo de Thor' }];
      sinon.stub(connection, 'execute').resolves([resultExecute]);

      const result = await productsModel.getById(1);

      expect(result).to.be.a('object');
      expect(result).to.all.keys('id', 'name');
      expect(result.id).to.be.equal(1);
      expect(result.name).to.be.equal('Martelo de Thor');
    });

    it('Retorna um array vazio, caso o Id do produto não seja encontrado', async () => {
      const resultExecute = [];
      sinon.stub(connection, 'execute').resolves([[resultExecute]]);

      const result = await productsModel.getById(10);

      expect(result).to.be.a('array');
      expect(result).to.be.length(0);
    });
  });

  describe('função create', () => {
    it('Retorna um objeto, informando Id e Name', async () => {
      const name = 'Martelo do Batman'
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await productsModel.create(name);

      expect(result).to.all.keys('id', 'name');
      expect(result.id).to.be.equal(4);
      expect(result.name).to.be.equal('Martelo do Batman');
    });
  });

  describe('função update', () => {
    it('Retorna um objeto, informando o Id e Name do produto atualizado', async () => {
      const id = 1;
      const name = 'Anel do Lanterna Verde';
      sinon.stub(connection, 'execute').resolves();

      const result = await productsModel.update(id, name);

      expect(result).to.be.a('object');
      expect(result).to.all.keys('id', 'name');
      expect(result.id).to.be.equal(id);
      expect(result.name).to.be.equal(name);
    });
  });

  describe('função delete', () => {
    it('Deleta o produto do Id informado', async () => {
      const id = 1;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await productsModel.delete(id);

      expect(result).to.be.a('object').and.to.have.property('affectedRows', 1);
    });
  });
});