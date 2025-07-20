const request = require('supertest');
const mongoose = require('mongoose');
const { setupTestDB, teardownTestDB, createSampleCategory } = require('../utils/testSetup');
const app = require('../../server');
const Product = require('../../models/Product');
const Category = require('../../models/Category');

describe('Product API Integration Tests', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
    await Category.deleteMany({});
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const category = await createSampleCategory(Category);
      await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 29.99,
        category: category._id
      });

      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
});