const Joi = require('joi');
const CustomError = require('../errors/customError');

const validators = {
  products: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      if (error.details[0].type === 'any.required') {
        throw new CustomError(400, error.details[0].message);
      }
      if (error.details[0].type === 'string.min') {
        throw new CustomError(422, error.details[0].message);
      }
    }

    next();
  },
};

module.exports = validators;