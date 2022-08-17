const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../services/Products');
const productsControllers = require('../../../controllers/Products');
const testMyController = require('../../utils/');

describe('Teste Products Controllers', () => {
  afterEach(sinon.restore)

  describe('função getAll', () => {
    it('Retorna status 200', async () => {
      const resultService = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ]
      sinon.stub(productsServices, 'getAll').resolves(resultService);

      const result = await testMyController(productsControllers.getAll);

      expect(result.status).to.be.equal(200);
    });

    it('Retorna json com as informações de todos os produtos', async () => {
      const resultService = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ]

      sinon.stub(productsServices, 'getAll').resolves(resultService);

      const result = await testMyController(productsControllers.getAll);

      expect(result.body).to.be.deep.equal(resultService);
    });
  });

  describe('função getById', () => {
    it('Retorna status 200', async () => {
      const resultService = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      const params = 1;
      sinon.stub(productsServices, 'getById').resolves(resultService);

      const result = await testMyController(productsControllers.getById, { params });

      expect(result.status).to.be.equal(200);
    });

    it('Retorna json com as informações do produto enviada pelo parametro', async () => {
      const resultService = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      const params = 1;
      sinon.stub(productsServices, 'getById').resolves(resultService);

      const result = await testMyController(productsControllers.getById, { params });

      expect(result.body).to.be.deep.equal(resultService);
    });
  })

  describe('função create', () => {
    it('Retorna status 201', async () => {
      const resultService = {
        "id": 4,
        "name": "Rolo de Macarrão da Flávia",
      }
      const body = 'Rolo de Macarrão da Flávia';
      sinon.stub(productsServices, 'create').resolves(resultService);

      const result = await testMyController(productsControllers.create, { body });

      expect(result.status).to.be.equal(201);
    });

    it('Retorna json com as informações do produto criado', async () => {
      const resultService = {
        "id": 4,
        "name": "Rolo de Macarrão da Flávia",
      }
      const body = 'Rolo de Macarrão da Flávia';
      sinon.stub(productsServices, 'create').resolves(resultService);

      const result = await testMyController(productsControllers.create, { body });

      expect(result.body).to.be.deep.equal(resultService);
    });
  })

  describe('função update', () => {
    it('Retorna status 200', async () => {
      const resultService = {
        "id": 1,
        "name": "Rolo de Macarrão da Flávia",
      }
      const params = 1;
      const body = 'Rolo de Macarrão da Flávia';
      sinon.stub(productsServices, 'update').resolves(resultService);

      const result = await testMyController(productsControllers.update, { params, body });

      expect(result.status).to.be.equal(200);
    });

    it('Retorna json com as informações do produto atualizado', async () => {
      const resultService = {
        "id": 1,
        "name": "Rolo de Macarrão da Flávia",
      }
      const params = 1;
      const body = 'Rolo de Macarrão da Flávia';
      sinon.stub(productsServices, 'update').resolves(resultService);

      const result = await testMyController(productsControllers.update, { params, body });

      expect(result.body).to.be.deep.equal(resultService);
    });
  })

  describe('função delete', () => {
    it('Retorna status 204', async () => {
      const resultService = { affectedRows: 1 };
      const params = 1;
      sinon.stub(productsServices, 'delete').resolves(resultService);

      const result = await testMyController(productsControllers.delete, { params });

      expect(result.status).to.be.equal(204);
    });

    it('Teste se "result.end" é igual true', async () => {
      const resultService = { affectedRows: 1 };
      const params = 1;
      sinon.stub(productsServices, 'delete').resolves(resultService);

      const result = await testMyController(productsControllers.delete, { params });

      expect(result.end).to.be.deep.equal(true);
    });
  })
});