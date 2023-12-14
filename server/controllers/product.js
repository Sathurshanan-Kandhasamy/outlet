import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/product.js';

// Description:  Gets all the products.
// Route:        GET /api/products
// Access:       Public
export const getProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({});
  response.json(products);
});

// Description:  Gets a product by id.
// Route:        GET /api/products/:id
// Access:       Public
export const getProductById = asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    response.json(product);
  } else {
    response.status(404);
    throw new Error('Resource not found.');
  }
});
