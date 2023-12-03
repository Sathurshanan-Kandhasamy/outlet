import express from 'express';
const ROUTER = express.Router();
import {
  QUERY_PRODUCTS,
  QUERY_SINGLE_PRODUCT,
} from '../controllers/product.js';

ROUTER.route('/').get(QUERY_PRODUCTS);
ROUTER.route('/:id').get(QUERY_SINGLE_PRODUCT);

export default ROUTER;
