import ASYNC_HANDLER from '../middleware/asyncHandler.js';
import PRODUCT from '../models/product.js';

// Description:  Queries all the products.
// Route:        GET /api/products
// Access:       Public
const QUERY_PRODUCTS = ASYNC_HANDLER(async (request, response) => {
  const ALL_PRODUCTS = await PRODUCT.find({});
  response.json(ALL_PRODUCTS);
});

// Description:  Queries single product.
// Route:        GET /api/products/:id
// Access:       Public
const QUERY_SINGLE_PRODUCT = ASYNC_HANDLER(async (request, response) => {
  const SIGNLE_PRODUCT = await PRODUCT.findById(request.params.id);
  if (SIGNLE_PRODUCT) {
    response.json(SIGNLE_PRODUCT);
  } else {
    response.status(404);
    throw new Error('Resource not found.');
  }
});

export { QUERY_PRODUCTS, QUERY_SINGLE_PRODUCT };
