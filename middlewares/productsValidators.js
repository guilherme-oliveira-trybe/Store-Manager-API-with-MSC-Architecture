const Joi = require('joi');
const CustomError = require('../errors/customError');

const validators = {
  Body: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
    });

    const { error: { details } } = schema.validate(req.body);

    switch (details[0].type) {
      case 'any.required':
        throw new CustomError(400, details[0].message);
      case 'string.min':
        throw new CustomError(422, details[0].message);
      default:
        break;
    }

    // if (details[0].type === 'any.required') {
    //   throw new CustomError(400, details[0].message);
    // }

    // if (details[0].type === 'string.min') {
    //   throw new CustomError(422, details[0].message);
    // }

    next();
  },
};

module.exports = validators;