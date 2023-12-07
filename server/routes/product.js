import express from 'express';
const ROUTER = express.Router();
import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from '../controllers/product.js';

ROUTER.route('/').get(GET_PRODUCTS);
ROUTER.route('/:id').get(GET_PRODUCT_BY_ID);

export default ROUTER;
