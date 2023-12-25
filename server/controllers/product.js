import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/product.js';

// Description:  Gets all the products.
// Route:        GET /api/products
// Access:       Public
export const getProducts = asyncHandler(async (request, response) => {
  const pageSize = 8;
  const page = Number(request.query.pageNumber) || 1;
  const keyword = request.query.keyword
    ? { name: { $regex: request.query.keyword, $options: 'i' } }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  response.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// Description:  Delete a product.
// Route:        DELETE /api/products/:id
// Access:       Private/Admin
export const deleteProduct = asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    response.status(200).json({ message: 'Product deleted.' });
  } else {
    response.status(404);
    throw new Error('Resource not found.');
  }
});

// Description:  Create a new review.
// Route:        POST /api/products/:id/reviews
// Access:       Private
export const createProductReview = asyncHandler(async (request, response) => {
  const { rating, comment } = request.body;

  const product = await Product.findById(request.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === request.user._id.toString()
    );
    if (alreadyReviewed) {
      response.status(400);
      throw new Error('Product already reviewed.');
    }

    const review = {
      name: request.user.name,
      rating: Number(rating),
      comment,
      user: request.user._id,
    };
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce(
        (accumulator, review) => accumulator + review.rating,
        0
      ) / product.reviews.length;
    await product.save();
    response.status(201).json({ message: 'Review added.' });
  } else {
    response.status(404);
    throw new Error('Resource not found.');
  }
});
