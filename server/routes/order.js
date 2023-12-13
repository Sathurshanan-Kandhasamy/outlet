import express from 'express';
const ROUTER = express.Router();
import {
  ADD_ORDER_ITEMS,
  GET_MY_ORDERS,
  GET_ORDER_BY_ID,
  UPDATE_ORDER_TO_PAID,
  UPDATE_ORDER_TO_DELIVERED,
  GET_ORDERS,
} from '../controllers/order.js';
import { PROTECT, ADMIN } from '../middleware/authentication.js';

ROUTER.route('/')
  .get(PROTECT, ADMIN, GET_ORDERS)
  .post(PROTECT, ADD_ORDER_ITEMS);
ROUTER.route('/mine').get(PROTECT, GET_MY_ORDERS);
ROUTER.route('/:id').get(PROTECT, ADMIN, GET_ORDER_BY_ID);
ROUTER.route('/:id/pay').put(PROTECT, UPDATE_ORDER_TO_PAID);
ROUTER.route('/:id/deliver').put(PROTECT, ADMIN, UPDATE_ORDER_TO_DELIVERED);

export default ROUTER;
