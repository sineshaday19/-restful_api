const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const testUtils = {
  setupTestDB: async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  },

  teardownTestDB: async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  },

  createSampleCategory: async (Category) => {
    return await Category.create({
      name: 'Test Category',
      description: 'Test Description'
    });
  },

  createSampleProduct: async (Product, categoryId) => {
    return await Product.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 29.99,
      category: categoryId,
      inventory: 100
    });
  }
};

module.exports = testUtils;