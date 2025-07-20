const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

module.exports = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', details: error.details });
  }
  next();
}; 