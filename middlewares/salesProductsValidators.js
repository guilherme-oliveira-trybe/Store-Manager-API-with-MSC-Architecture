const Joi = require('joi');
const CustomError = require('../errors/customError');

const validators = {
  sales: async (req, res, next) => {
    const schema = Joi.array().items(Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().min(1).required(),
    }));

    const { error } = schema.validate(req.body);
    
    if (error) {
      const newMessage = error.details[0].message.split('.');

      if (error.details[0].type === 'any.required') {
        throw new CustomError(400, `"${newMessage[1]}`);
      }
      if (error.details[0].type === 'number.min') {
        throw new CustomError(422, `"${newMessage[1]}`);
      }
    }

    next();
  },
};

module.exports = validators;