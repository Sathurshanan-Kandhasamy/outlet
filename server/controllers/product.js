import ASYNC_HANDLER from '../middleware/asyncHandler.js';
import PRODUCT from '../models/product.js';

// Description:  Gets all the products.
// Route:        GET /api/products
// Access:       Public
export const GET_PRODUCTS = ASYNC_HANDLER(async (request, response) => {
  const ALL_PRODUCTS = await PRODUCT.find({});
  response.json(ALL_PRODUCTS);
});

// Description:  Gets a product by id.
// Route:        GET /api/products/:id
// Access:       Public
export const GET_PRODUCT_BY_ID = ASYNC_HANDLER(async (request, response) => {
  const SIGNLE_PRODUCT = await PRODUCT.findById(request.params.id);
  if (SIGNLE_PRODUCT) {
    response.json(SIGNLE_PRODUCT);
  } else {
    response.status(404);
    throw new Error('Resource not found.');
  }
});
