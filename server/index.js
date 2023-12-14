import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectToDatabase from './config/database.js';
import { notFound, errorHandler } from './middleware/error.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
const PORT = process.env.PORT;

// Connects to MongoDB database.
connectToDatabase();

const app = express();

// Implements body parser middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware.
app.use(cookieParser());

app.get('/', (request, response) => {
  response.send('API is running.');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
