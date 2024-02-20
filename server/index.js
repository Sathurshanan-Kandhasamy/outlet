import path from 'path';
import express from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectToDatabase from './config/database.js';
import { notFound, errorHandler } from './middleware/error.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import uploadRoutes from './routes/upload.js';
const port = process.env.PORT;

// Connect to MongoDB database.
connectToDatabase();

const app = express();

// Use helmet.
app.use(helmet());

// Implement body parser middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware.
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (request, response) =>
  response.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // Set static folder.
  app.use(express.static(path.join(__dirname, '/client/build')));

  // Any route that is not api will be redirected to index.html.
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (request, response) => {
    response.send('API is running.');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
