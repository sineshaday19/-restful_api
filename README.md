# DEMO VIDEO

https://youtu.be/rRP_JXo1qHk

# Product Catalog API

A RESTful API for managing products and categories in an e-commerce platform. Built with Node.js, Express, and MongoDB.

## Features
- Product CRUD (Create, Read, Update, Delete)
- Category CRUD
- Product search, filtering, and pagination
- Product variants (size, color, stock)
- Inventory tracking
- Pricing and discounts
- Low-stock reporting
- Input validation and error handling
- Swagger API documentation

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd mini-api
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the root directory:
     ```env
     MONGODB_URI=mongodb://localhost:27017/product_catalog
     PORT=3000
     ```
   - Update `MONGODB_URI` if using a remote MongoDB instance.
4. **Start the server:**
   ```bash
   npm run dev
   ```
   The API will run at `http://localhost:3000` by default.

## API Documentation

Interactive Swagger docs are available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Example Endpoints

### Products
- `POST /api/products` — Create a product
- `GET /api/products` — List/search products
- `GET /api/products/:id` — Get product by ID
- `PUT /api/products/:id` — Update product
- `DELETE /api/products/:id` — Delete product
- `GET /api/products/report/low-stock` — Low-stock products

### Categories
- `POST /api/categories` — Create a category
- `GET /api/categories` — List categories
- `GET /api/categories/:id` — Get category by ID
- `PUT /api/categories/:id` — Update category
- `DELETE /api/categories/:id` — Delete category
