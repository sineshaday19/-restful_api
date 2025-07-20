const Product = require('../models/Product');
const Category = require('../models/Category');
const mongoose = require('mongoose');

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, variants, inventory, discount } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });
    const product = new Product({ name, description, price, category, variants, inventory, discount });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all products (with search/filter/pagination)
exports.getProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, dateFrom, dateTo, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, variants, inventory, discount } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, variants, inventory, discount },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get low-stock products (inventory < 5 or variant stock < 5)
exports.getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $or: [
        { inventory: { $lt: 5 } },
        { 'variants.stock': { $lt: 5 } }
      ]
    });
    res.json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 