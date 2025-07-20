const Joi = require('joi');

const variantSchema = Joi.object({
  size: Joi.string().optional(),
  color: Joi.string().optional(),
  stock: Joi.number().integer().min(0).optional(),
});

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  category: Joi.string().optional(),
  variants: Joi.array().items(variantSchema).optional(),
  inventory: Joi.number().integer().min(0).optional(),
  discount: Joi.number().min(0).optional(),
});

module.exports = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', details: error.details });
  }
  next();
}; 