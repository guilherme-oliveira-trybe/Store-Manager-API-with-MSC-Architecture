const sinon = require('sinon');

const BASIC_REQ = {
  body: undefined,
  params: {},
  headers: {},
};

const testMyController = async (controller, request = BASIC_REQ) => {
  const resultado = {
    body: undefined,
    status: undefined,
    end: false
  }
  const response = {
    json: (obj) => {
      resultado.body = obj
      return null
    },
    status: (num) => {
      resultado.status = num;
      return response
    },
    end: () => {
      resultado.end = true;
      return null
    }
  }
  const spyJson = sinon.spy(response, 'json');
  const spyStatus = sinon.spy(response, 'status')

  await controller(request, response)
  return { ...resultado, spies: { json: spyJson, status: spyStatus } }
}

module.exports = testMyController;