import express from 'express';
import 'dotenv/config';
import connectToDatabase from './config/database.js';
import productRoutes from './routes/products.js';
const PORT = process.env.PORT;

// Connects to MongoDB database.
connectToDatabase();

const APP = express();

APP.get('/', (request, response) => {
  response.send('API is running.');
});

APP.use('/api/products', productRoutes);

APP.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
