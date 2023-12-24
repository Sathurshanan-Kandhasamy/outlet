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

// Description:  Gets a product.
// Route:        POST /api/products
// Access:       Private/Admin
export const createProduct = asyncHandler(async (request, response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: request.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numberOfReviews: 0,
    description: 'Sample description',
  });
  const createdProduct = await product.save();
  response.status(201).json(createdProduct);
});

// Description:  Update a product.
// Route:        PUT /api/products/:id
// Access:       Private/Admin
export const updateProduct = asyncHandler(async (request, response) => {
  const { name, price, description, image, brand, category, countInStock } =
    request.body;
  const product = await Product.findById(request.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    response.json(updatedProduct);
  } else {
    response.status(404);
    throw new Error('Resource not found.');
  }
});
