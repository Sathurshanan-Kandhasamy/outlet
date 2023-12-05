import express from 'express';
import 'dotenv/config';
import CONNECT_TO_DATABASE from './config/database.js';
import { NOT_FOUND, ERROR_HANDLER } from './middleware/error.js';
import PRODUCT_ROUTES from './routes/product.js';
import USER_ROUTES from './routes/user.js';
const PORT = process.env.PORT;

// Connects to MongoDB database.
CONNECT_TO_DATABASE();

const APP = express();

// Implements body parser middleware.
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

APP.get('/', (request, response) => {
  response.send('API is running.');
});

APP.use('/api/products', PRODUCT_ROUTES);
APP.use('/api/users', USER_ROUTES);

APP.use(NOT_FOUND);
APP.use(ERROR_HANDLER);

APP.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
