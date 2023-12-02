import express from 'express';
import 'dotenv/config';
import connectToDatabase from './config/database.js';
import {
  NOT_FOUND as notFound,
  ERROR_HANDLER as errorHandler,
} from './middleware/error.js';
import productRoutes from './routes/products.js';
const PORT = process.env.PORT;

// Connects to MongoDB database.
connectToDatabase();

const APP = express();

APP.get('/', (request, response) => {
  response.send('API is running.');
});

APP.use('/api/products', productRoutes);

APP.use(notFound);
APP.use(errorHandler);

APP.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
