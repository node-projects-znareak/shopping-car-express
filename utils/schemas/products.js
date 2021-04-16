const Joi = require("joi");

const productIdShema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productTagSchema = Joi.array().items(Joi.string().max(10));

const createProductSchema = Joi.object({
  name: Joi.string().max(50).required(),
  price: Joi.number().min(1).max(100000),
  image: Joi.string().required(),
  tags: productTagSchema,
});

const updateProductShema = Joi.object({
  name: Joi.string().max(50),
  price: Joi.number().min(1).max(100000),
  image: Joi.string(),
  tags: productTagSchema,
});

module.exports = {
  createProductSchema,
  updateProductShema,
  productIdShema,
  productTagSchema,
};
