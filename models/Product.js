const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: String,
  color: String,
  stock: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String },
  variants: [variantSchema],
  inventory: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 