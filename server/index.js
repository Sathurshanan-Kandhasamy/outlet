import express from 'express';
import 'dotenv/config';
import CONNECT_TO_DATABASE from './config/database.js';
import products from './data/products.js';
const PORT = process.env.PORT;

// Connects to MongoDB database.
CONNECT_TO_DATABASE();

const APP = express();

APP.get('/', (request, response) => {
  response.send('API is running.');
});

APP.get('/api/products', (request, response) => {
  response.json(products);
});

APP.get('/api/products/:id', (request, response) => {
  const PRODUCT = products.find((product) => product._id === request.params.id);
  response.json(PRODUCT);
});

APP.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
