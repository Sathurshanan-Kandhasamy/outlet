import express from 'express';
const ROUTER = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/product.js';

// Queries all the products.
ROUTER.get(
  '/',
  asyncHandler(async (request, response) => {
    const PRODUCTS = await Product.find({});
    response.json(PRODUCTS);
  })
);

// Queries product by product id.
ROUTER.get(
  '/:id',
  asyncHandler(async (request, response) => {
    const PRODUCT = await Product.findById(request.params.id);
    if (PRODUCT) {
      response.json(PRODUCT);
    } else {
      response.status(404).json({ message: 'Product not found.' });
    }
  })
);

export default ROUTER;
